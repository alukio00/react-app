import pool from "../config/mysql.js"

export default async function handler (user) {
    try {
    
        const [books] = await pool.query("SELECT id, book from books where user = ?", [user])


        return books
        
    } catch (error) {

        console.log(error)
        return []

    }
    
}