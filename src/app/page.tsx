'use client'

import { useSession } from "next-auth/react";


export default function Home() {
  const { data: session, status } = useSession()
    

  if (status === 'loading') {
    return <p>Carregando...</p>
  }

  if (!session) {
    return <p>Você não está logado.</p>
  }
  // const { data, error } = await supabase
  // .from('product')
  // .select('*')

  // if (error) {
  //   console.log(error)
  // }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <pre>{JSON.stringify(session, null, 2)}</pre>
       
  
      </main>
    </div>
  );
}
