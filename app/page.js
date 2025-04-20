import { getServerSession } from "next-auth";
import Login from "./components/login";
import Manage from "./components/manage";
import getBooks from "./functions/getBooks.js"

export default async function Home() {

  const session = await getServerSession()

  

  if (session) {

    const books = await getBooks(session.user.email)
  
    return (
      <Manage books={books} />
    )
  } else {
    return (
    <Login />
  )
  }
}