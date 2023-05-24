import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import VkProvider from 'next-auth/providers/vk';
import jwtLib from 'jsonwebtoken';

export const authOptions = {
    session: {
        jwt: true,
        maxAge: 7 * 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            id: 'login',
            name: 'login',
            async authorize(credentials) {
                const response = await axios.post(process.env.LOGIN, {
                    email: credentials.email,
                    password: credentials.password,
                });
                if (response.status === 201 && response.data.token) {
                    const user = {
                        provider: 'database',
                        email: credentials.email,
                        accessToken: response.data.token,
                        refreshToken: response.data.refreshToken,
                    };
                    return user;
                } else {
                    return null;
                }
            },
        }),
        CredentialsProvider({
            id: 'register',
            name: 'register',
            async authorize(credentials) {
                const response = await axios.post(process.env.REGISTRATION, {
                    provider: 'database',
                    email: credentials.email,
                    password: credentials.password,
                });

                if (response.status === 201 && response.data.token) {
                    const user = {
                        email: credentials.email,
                        accessToken: response.data.token,
                        refreshToken: response.data.refreshToken,
                    };
                    return user;
                } else {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
        VkProvider({
            clientId: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_CLIENT_SECRET,
        }),
    ],
    pages: {
        error: '/auth/error',
        signin: '/auth/signin',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === 'google') {
                user.provider = 'google';
                const response = await axios.post(`${process.env.GOOGLE}`, undefined, {
                    params: {
                        email: user.email + '.oauth',
                        name: user.name,
                    },
                });
                user.accessToken = response.data.token;
                user.refreshToken = response.data.refreshToken;
                return true;
            }
            if (account.provider === 'vk') {
                user.provider = 'vk';
                const data = {
                    access_token: account.access_token,
                    expires_in: 86400,
                    user_id: account.user_id,
                    name: user.name,
                };
                const response = await axios.post(process.env.VK, data);
                user.accessToken = response.data.token;
                user.refreshToken = response.data.refreshToken;
                return true;
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user && account) {
                console.log('first login');
                const payload = jwtLib.decode(user.accessToken);
                token.provider = user.provider;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.user_id = payload.id;
                token.expires_at = payload.exp;
                token.roles = payload.roles.map((item) => {
                    return { id: item.id, value: item.value };
                });
                return token;
            } else if (Date.now() < token.expires_at * 1000) {
                console.log('still logged in');
                return token;
            } else {
                console.log('refreshing token');
                try {
                    const response = await axios.post(
                        `${process.env.REFRESH_TOKEN}/${token.user_id}`,
                        undefined,
                        {
                            headers: {
                                Authorization: `Bearer ${token.refreshToken}`,
                            },
                        }
                    );
                    const payload = jwtLib.decode(response.data.token);
                    token.expires_at = payload.exp;
                    token.accessToken = response.data.token;
                    token.refreshToken = response.data.refreshToken ?? token.refreshToken;
                    console.log('refreshed token', new Date());
                    return token;
                } catch (err) {
                    console.error(err.message);
                    throw Error(err);
                }
            }
        },
        async session({ session, token }) {
            session.provider = token.provider;
            session.accessToken = token.accessToken;
            session.expires_at = token.expires_at;
            session.user.id = token.user_id;
            session.user.roles = token.roles;
            return session;
        },
    },
};
export default NextAuth(authOptions);
