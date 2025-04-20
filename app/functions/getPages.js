import pool from "../config/mysql.js"

export default async function handler (user, id) {
    try {
      
        const [book] = await pool.query("SELECT book from books where user = ? and id = ?", [user, id])

        const [pages] = await pool.query(`
            SELECT p.id, p.content, p.page
            from pages p 
            LEFT JOIN books b ON p.book = b.id 
            where b.user = ? AND b.id = ?
            ORDER BY p.page ASC
            `, [user, id])


        return { pages, book: book[0]?.book }
        
    } catch (error) {

        console.log(error)
        return false

    }
    
}