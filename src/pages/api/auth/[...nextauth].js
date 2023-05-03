import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import VkProvider from 'next-auth/providers/vk';
import { GenDBPasswordMock } from '../../../utils/auth.util';
import jwtLib from 'jsonwebtoken';

//TODO: error page redirect
export const authOptions = {
    session: {
        jwt: true,
        maxAge: 86400,
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
        error: 'auth/error',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === 'google') {
                user.provider = 'google';
                try {
                    const checkResponse = await axios.get(
                        `${process.env.CHECK_EMAIL_VACANCY}/${encodeURIComponent(
                            profile.email
                        )}.oauth`
                    );
                    if (checkResponse.status === 200) {
                        const data = {
                            email: `${profile.email}.oauth`,
                            password: GenDBPasswordMock(user.email),
                        };
                        const response = await axios.post(process.env.REGISTRATION, data);
                        user.accessToken = response.data.token;
                        return true;
                    }
                } catch (err) {
                    if (err.response.status === 400) {
                        const data = {
                            email: `${profile.email}.oauth`,
                            password: GenDBPasswordMock(profile.email),
                        };
                        const response = await axios.post(process.env.LOGIN, data);
                        user.accessToken = response.data.token;
                        return true;
                    } else {
                        throw err;
                    }
                }
            }
            if (account.provider === 'vk') {
                user.provider = 'vk';
                const data = {
                    access_token: account.access_token,
                    expires_in: 86400,
                    user_id: account.user_id,
                };
                const response = await axios.post(process.env.VK, data);
                user.accessToken = response.data.token;
                return true;
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                const payload = jwtLib.decode(user.accessToken);
                token.provider = user.provider;
                token.accessToken = user.accessToken;
                token.id = payload.id;
                token.roles = payload.roles.map((item) => {
                    return { id: item.id, value: item.value };
                });
            }
            return token;
        },
        async session({ session, token }) {
            session.provider = token.provider;
            session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.roles = token.roles;
            return session;
        },
    },
};
export default NextAuth(authOptions);
