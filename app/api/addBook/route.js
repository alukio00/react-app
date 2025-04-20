import pool from "../../config/mysql.js"
import { getToken } from "next-auth/jwt"

const addBook = async (req) => {
    try {
        

        const { book } = await req.json()

        const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

        if (!session) {
            return new Response(true, {status: 401})
        }
        const user = session.email

        
        await pool.query("INSERT INTO books (book, user) VALUES (?, ?)", [book, user])


        return new Response(true, {status: 200})
        
    } catch (error) {

        console.log(error)
        return res.status(500)
    }
    
}
export { addBook as POST }