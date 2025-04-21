"use client"

import { HiXMark } from "react-icons/hi2"
import { useState, forwardRef, useImperativeHandle } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import "./styles.css"

export const Zoom = forwardRef(({pages}, ref) => {

    const [isZoom, setZoom] = useState(false)
    const [currPage, setCurr] = useState(0)

    const page = pages[currPage]

    const nextPage = () => {
        if (currPage + 1 < pages.length) {
            setCurr(currPage + 1)
        }
    }
    const prevPage = () => {
        if (currPage > 0) {
            setCurr(currPage - 1)
        }
    }

    useImperativeHandle(ref, () => ({

        setCurrent(id) {
            setCurr(id)
            setZoom(true)
        }
    }))

        return (
            <div className={isZoom ? "block" : "hidden"}>
        
                <HiXMark onClick={() => setZoom(false)} className="w-14 fixed top-6 right-6 h-14 cursor-pointer shadow-div text-1 bg-white p-2 rounded-full z-30" />
                  
                <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto px-5 py-10 z-10 background-opacity">
                    <div className="bg-white rounded-xl max-w-130 m-auto w-full shadow-div p-6">
                        <p className="text-black page-content">
                            {page.content}
                        </p>
                        
                    </div>
                </div>
                <div className="fixed w-full bottom-6 max-sm:bottom-4 left-0 flex justify-center gap-4 items-center z-30">

                    <MdOutlineChevronLeft onClick={prevPage} className="w-10 h-10 p-1 cursor-pointer navigation-div"/>

                    <p className="navigation-div font-medium px-3 py-2">Strona: {page.page ? page.page : "?"}</p>

                    <MdOutlineChevronRight onClick={nextPage} className="w-10 h-10 cursor-pointer navigation-div"/>
                </div>
        
            </div>
        );
})
    
