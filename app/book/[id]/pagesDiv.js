"use client"

import { useState } from 'react';

export function Pages({pages: allPages}) {

  const [pages, setPages] = useState(allPages);



  return (
    <>

        <h2 className='text-center text-4xl text-white'>Strony</h2>

        <div className='flex flex-wrap w-full justify-center max-w-300 gap-6'>
            {pages.map(page => (
                <div className='flex flex-col gap-2 p-4 rounded-xl w-90 bg-white'>
                    <p className='text-2xl font-semibold'>Strona - {page.page ? page.page : "?"}</p>
                    <p className='text-1'>{page.content.slice(0, 200)}...</p>

                </div>
            ))}
        </div>

    </>
  );
}