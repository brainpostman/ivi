import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import VkProvider from 'next-auth/providers/vk';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

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
                try {
                    const response = await axios.post(process.env.LOGIN, {
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
                } catch (err) {
                    console.log(err.response.data);
                    throw Error(err);
                }
            },
        }),
        CredentialsProvider({
            id: 'register',
            name: 'register',
            async authorize(credentials) {
                try {
                    const response = await axios.post(process.env.REGISTRATION, {
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
                } catch (err) {
                    console.log(err.response.data);
                    throw Error(err);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: 'https://accounts.google.com/o/oauth2/auth',
        }),
        VkProvider({
            clientId: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
                token.accessToken = user.accessToken;
            }
            console.log(user);
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            return session;
        },
    },
};
export default NextAuth(authOptions);
