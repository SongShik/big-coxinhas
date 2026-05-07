'use client'

import { LayoutDashboard, Menu, PackageSearch, PlusIcon, ReceiptText } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MenuMobile() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="fixed bottom-0 left-0 flex h-16 w-full items-center border-t border-laranja-400/50 bg-white">
      <Link
        href="/dashboard"
        className={`flex flex-1 flex-col items-center text-[9px] md:text-base ${isActive('/dashboard') ? 'text-laranja-500' : 'text-muted-foreground'}`}
      >
        <LayoutDashboard className="h-6 w-6" />
        Dashboard
      </Link>

      <Link
        href="/produtos"
        className={`flex flex-1 flex-col items-center text-[9px] md:text-base ${isActive('/produtos') ? 'text-laranja-500' : 'text-muted-foreground'}`}
      >
        <PackageSearch className="h-6 w-6" />
        Produtos
      </Link>

      <Link href="/comandas" className="flex flex-1 justify-center ">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-laranja-500 text-white -mt-8 shadow-lg">
          <PlusIcon className="h-7 w-7" />
        </div>
      </Link>

      <Link
        href="/clientes"
        className={`flex flex-1 flex-col items-center text-[9px] md:text-base ${isActive('/clientes') ? 'text-laranja-500' : 'text-muted-foreground'}`}
      >
        <ReceiptText className="h-6 w-6" />
        Clientes
      </Link>

      <Link
        href="/menu"
        className={`flex flex-1 flex-col items-center text-[9px] md:text-base ${isActive('/menu') ? 'text-laranja-500' : 'text-muted-foreground'}`}
      >
        <Menu className="h-6 w-6" />
        Menu
      </Link>
    </div>
  )
}
