"use client"
import { useRef, useState } from "react";

export default function Manage({ books }) {
 
    const input = useRef()

    const [list, setList] = useState(books)

    const addBook = async (event) => {
        event.preventDefault()

        const value = input.current.value

        const res = await fetch("/api/addBook", {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({book: value}),
            headers: {
                "Content-type": "application/json"
            }
        })
        if (res.ok) {
            const newBooks = await res.json()
        
            setList(newBooks)
            input.current.value = ""
        }

       
    }
    
    return (
      <div className="w-full h-screen flex flex-col justify-center gap-8 items-center">
        <h1>Twoje książki</h1>
        <div className="flex w-full flex-col gap-6 items-center">
            
            {list.map(book => (
                <div className="books-div">
                    <div className="flex justify-between gap-2">
                        <p className="text-2xl font-medium">{book.book}</p>
                        <a href={"/book/" + book.id} className="underline text-blue-600">Pokaż książke</a>
                    </div>
                </div>
                )
            )}

            <form className="books-div" onSubmit={addBook}>
                <div className="input-div">
                    <label htmlFor="name">Tytuł książki</label>
                    <input ref={input} className="my-input" id="name" name="name" required />
                </div>
            
                <button type="submit" className="button-1">Dodaj książkę</button>
            </form>

        </div>
      </div>
    );
  
}