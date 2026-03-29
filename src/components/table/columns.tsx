"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";

export type Payment = {
  id: string
  name: string
  price: number
  weight: number
  order: string
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={"Nome"} />
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      return currencyFormatter.format(Number(row.getValue("price")))
    },
  },
  {
    accessorKey: "weight",
    header: "Peso",
  },
  {
    accessorKey: "order",
    header: "Ordem",
  },
]
