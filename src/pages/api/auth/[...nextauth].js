import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import VkProvider from 'next-auth/providers/vk'

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
          })

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
                    if (axios.isAxiosError(err)) {
                        console.error('AxiosError: ', err.message);
                        throw new Error(err.message);
                    } else {
                        console.error('Error: ', err);
                        throw new Error('Произошла непредвиденная ошибка');
                    }
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
                    if (axios.isAxiosError(err)) {
                        console.error('AxiosError: ', err.message);
                        throw new Error(err.message);
                    } else {
                        console.error('Error: ', err);
                        throw new Error('Произошла непредвиденная ошибка');
                    }
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
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
                token.accessToken = user.accessToken;
            }
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
