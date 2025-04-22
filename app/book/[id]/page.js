import getPages from "../../functions/getPages.js"
import { Pages } from "./pagesDiv.js"
import { Upload } from "./image.js"
import { getServerSession } from "next-auth"

export default async function Book({ params }) {
    const { id } = await params

    const session = await getServerSession()
   
    const user = session?.user?.email
    
    const info = await getPages(user, id)

    return (
        <div className="flex flex-col my-10 w-full gap-8 items-center justify-center">
            <h1>{info.book}</h1>

            <Upload book={id} />


            <Pages  pages={info.pages}/>
            
        </div>
    )
}