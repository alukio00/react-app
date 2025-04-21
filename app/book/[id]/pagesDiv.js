"use client"

import deletePage from "../../functions/deletePage.js"
import { useState, useRef } from 'react';
import { useSession } from "next-auth/react";
import { Zoom } from './zoom';

export function Pages({pages: allPages}) {

  const [pages, setPages] = useState(allPages);

  const session = useSession()
     
  const user = session?.data?.user?.email

  const removePage = async (id) => {
    const res = await deletePage(user, id)

    if (res) {
      setPages(pages.filter(el => el.id != id))
    }
  }
  
  const childRef = useRef()

  return (
    <>

        <h2 className='text-center text-4xl my-8 text-white'>Strony</h2>

        <div className='flex flex-wrap w-full justify-center max-w-300 gap-6'>
            {pages.map((page, index) => (
                <div key={page.id} className='flex flex-col gap-2 p-4 rounded-xl w-90 shadow-div bg-white'>
                    <div className='flex justify-between items-center gap-2'>

                      <p className='text-2xl font-semibold'>Strona - {page.page ? page.page : "?"}</p>

                      <div className='flex gap-4 items-center'>
                        <button className='text-red-600 cursor-pointer underline' onClick={() => removePage(page.id)}>Usuń</button>
                        <button className='text-blue-600 cursor-pointer underline' onClick={() => childRef.current.setCurrent(index)}>Zobacz</button>
                      </div>

                    </div>
                    
                    <p className='text-1'>{page.content.slice(0, 200)}...</p>

                </div>
            ))}
        </div>
        <Zoom ref={childRef} pages={pages} />
    </>
  );
}