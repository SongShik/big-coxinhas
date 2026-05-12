'use client'

import { ChevronLeft, ChevronRight, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { currencyFormatter } from '@/utils/currencyFormatter'

import { AvatarIcon } from '../comandas/avatarIcon'
import { DateBadge } from '../comandas/dateBadge'
import PaymentBadge from '../comandas/paymentBadge'

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20]
const DEFAULT_ITEMS_PER_PAGE = 10

interface Comandas {
  id: string
  data_order: string
  total_comanda: number
  clients: any
  payments: { id: string; total: number }[]
}

interface ComandasListProps {
  comandas: Comandas[]
}

export function ComandasList({ comandas }: ComandasListProps) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return comandas
    return comandas.filter((c) => c.clients.name.toLowerCase().includes(q))
  }, [comandas, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filtered.slice(start, start + itemsPerPage)
  }, [filtered, currentPage, itemsPerPage])

  function handleSearch(value: string) {
    setSearch(value)
    setCurrentPage(1)
  }

  function handleItemsPerPage(value: string) {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const startItem = filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, filtered.length)

  return (
    <div className="bg-background px-2 py-4 rounded-lg mt-6">
      <Field className="max-w-sm mb-6">
        <InputGroup>
          <InputGroupInput
            id="inline-start-input"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      </Field>

      {paginated.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground text-sm">Nenhuma comanda encontrada.</p>
      ) : (
        paginated.map((comanda) => (
          <Item asChild key={comanda.id} className="border-0 border-t border-muted rounded-none">
            <div>
              <ItemMedia>
                <AvatarIcon name={comanda.clients.name} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="flex-col gap-1 items-start">
                  {comanda.clients.name}
                  <DateBadge date={new Date(comanda.data_order)} />
                </ItemTitle>
                <ItemDescription className="flex justify-between w-full">
                  <span className="font-medium text-muted-foreground">
                    {currencyFormatter.format(comanda.total_comanda)}
                  </span>
                  <PaymentBadge payments={comanda.payments} total={comanda.total_comanda} />
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" className="ml-auto text-muted-foreground">
                  <Link href={`/comandas/editar/${comanda.id}`}>
                    <ChevronRight />
                  </Link>
                </Button>
              </ItemActions>
            </div>
          </Item>
        ))
      )}
      <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>{filtered.length === 0 ? 'Nenhum resultado' : `${startItem}-${endItem} de ${filtered.length}`}</span>
          <div className="flex items-center gap-1">
            <span className="whitespace-nowrap">itens</span>
            <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPage}>
              <SelectTrigger className="w-16 h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Pagina anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getPageNumbers(currentPage, totalPages).map((page, idx) =>
            page === '...' ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground text-sm">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'ghost'}
                size="icon"
                className={
                  page === currentPage
                    ? 'bg-laranja-500 hover:bg-laranja-500 text-white w-8 h-8 text-sm'
                    : 'w-8 h-8 text-sm'
                }
                onClick={() => setCurrentPage(Number(page))}
              >
                {page}
              </Button>
            ),
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Proxima pagina"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | '...')[] = []

  pages.push(1)
  if (current > 3) pages.push('...')

  const rangeStart = Math.max(2, current - 1)
  const rangeEnd = Math.min(total - 1, current + 1)
  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i)

  if (current < total - 2) pages.push('...')
  pages.push(total)

  return pages
}
