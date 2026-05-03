'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { DataTableColumnHeader } from '../table/data-table-column-header'

export type Payment = {
  id: string
  name: string
  price: number
  weight: number
  order: string
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const productsColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={'Nome'} />
    },
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ row }) => {
      return currencyFormatter.format(Number(row.getValue('price')))
    },
  },
  {
    accessorKey: 'weight',
    header: 'Peso',
    cell: ({ row }) => {
      return `${row.getValue('weight')}g`
    },
  },
  {
    accessorKey: 'action',
    header: 'Ação',
    cell: ({ row }) => {
      const router = useRouter()
      const id = row.original.id
      return (
        <Button
          variant="ghost"
          className="ml-auto hover:bg-laranja-500 hover:text-white text-laranja-500"
          onClick={() => router.push(`/produtos/${id}`)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )
    },
  },
]
