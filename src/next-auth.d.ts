// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            _id: string
            username: string
            email: string
            role: 'admin' | 'viewer' | string
        }
    }
}