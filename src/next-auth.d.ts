import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        user: {
            _id: string
            username: string
            email: string
            role: 'admin' | 'viewer' | string
        } & DefaultSession["user"]
    }

    interface User {
        _id: string
        username: string
        email: string
        role: 'admin' | 'viewer' | string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        username: string
        email: string
        role: 'admin' | 'viewer' | string
    }
}
