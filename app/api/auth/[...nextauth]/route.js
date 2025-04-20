import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"


export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    pages: {
        signIn: "/"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },

}) 

export { handler as GET, handler as POST }