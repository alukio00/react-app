"use server"

import { TextractClient, DetectDocumentTextCommand } from "@aws-sdk/client-textract";
import pool from "../config/mysql.js"


const client = new TextractClient({ region: "eu-central-1", credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    
} });

export default async function addPages(pages, book) {
    try {
        for (const page of pages) {
          
            const cleanPage = page.data_url.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(cleanPage, "base64");
      
            const command = new DetectDocumentTextCommand({
              Document: {
                Bytes: buffer
              }
            });
      
            const response = await client.send(command);

            const lines = response.Blocks.filter(el => el.BlockType == "LINE" && el.Confidence > 90)

            const title = lines.find(line => {
              const box = line.Geometry?.BoundingBox;
            
              return (
                box?.Top < 0.5 &&         // na górze strony
                box?.Height > 0.03 &&     // większa czcionka
                line.Text.length < 60     // nie za długa
              );
            });
            const pageTitle = title ? title.Text : null


            const text = lines.map(el => el.Text).filter(el => el.length > 7 && el != pageTitle).join("\n")


            const pageNumberLine = lines.find(line => {

              const box = line.Geometry?.BoundingBox;

              const isBottomOrTop = box?.Top > 0.85 || box?.Top < 0.15;

              const isNumber = /^\d+$/.test(line.Text.trim());


              return isBottomOrTop && isNumber;
            });
            
            const pageNumber = pageNumberLine ? parseInt(pageNumberLine.Text.trim()) : null;

          

            await pool.query("INSERT INTO pages (book, title, content, page) VALUES (?, ?, ?, ?)", [book, pageTitle, text, pageNumber])
            
            console.log("Dodano strone - ", pageNumber)
          }
        return true
    } catch (error) {
        console.log(error)

        return false
    }
}