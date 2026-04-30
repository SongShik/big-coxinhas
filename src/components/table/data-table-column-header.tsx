import { type Column } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title
}: DataTableColumnHeaderProps<TData, TValue>) {

    return (
        <div className="flex gap-2 align-middle"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            <ArrowUpDown className="h-4 w-4" />
        </div>
    )
}
