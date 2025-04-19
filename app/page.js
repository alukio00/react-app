'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {

  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <div>
        <h1 className="text-white">Zalogowany - {session.user.name}</h1>
        <button onClick={() => signOut()}>Wyloguj się</button>
      </div>
    )
  } else {
    return (
      <div className="w-full h-screen flex flex-col justify-center gap-8 items-center">
        <h1 className="text-3">Logowanie</h1>
        <form className="w-full flex flex-col gap-6 max-w-150 bg-3 rounded-xl p-6">

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xl">Email</label>
            <input type="email" id="email" className="my-input" name="email"/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xl">Hasło</label>
            <input type="password" id="password" className="my-input" name="password"/>
          </div>

          <button type="button" onClick={() => signIn("google")}>Lub zaloguj się z google</button>

          <button className="button-1">Zaloguj się</button>
        </form>
      </div>
    );
  }
}
