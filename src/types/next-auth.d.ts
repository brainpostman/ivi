import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
        provider: string | null;
        accessToken: string | null;
        refreshToken: string | null;
        expires_at: number;
    }

    interface User {
        id: number;
        name?: string;
        email?: string;
        image?: string;
        roles: IRole[];
        [key: string]: any;
    }
}

interface IRole {
    id: number;
    value: string;
}
