"use server"

import pool from "../config/mysql.js"

export default async function handler (user, id) {
    try {
     
        await pool.query(`
            DELETE p.* 
            from pages p 
            LEFT JOIN books b ON b.id = p.book 
            where b.user = ? and p.id = ?
            `, [user, id])

        return true
        
    } catch (error) {

        console.log(error)
        return false

    }
    
}