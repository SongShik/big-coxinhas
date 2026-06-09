'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { currencyFormatter } from '@/utils/currencyFormatter'

const PREVIEW_COUNT = 1

interface ItemComanda {
  id: string
  quantity: number
  unit_value: number
  total_value: number
  products: { name: string }[]
}

interface ItensComandaProps {
  itens: ItemComanda[]
}

export function ItensComanda({ itens }: ItensComandaProps) {
  const [expanded, setExpanded] = useState(false)

  const hasMore = itens.length > PREVIEW_COUNT
  const previewItems = itens.slice(0, PREVIEW_COUNT)
  const hiddenItems = itens.slice(PREVIEW_COUNT)
  const hiddenCount = hiddenItems.length

  return (
    <div className="bg-background px-2 py-4 rounded-lg mt-6 w-full">
      <div className="flex justify-between flex-row gap-4 mb-1">
        <p className="text-base font-medium">Itens da comanda</p>
        <Badge variant="secondary">
          {itens.length} {itens.length === 1 ? 'item' : 'itens'}
        </Badge>
      </div>

      {itens.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground text-sm">Nenhum item nessa comanda.</p>
      ) : (
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          {previewItems.map((item) => (
            <Item asChild key={item.id} className="border-0 not-first:border-t border-muted rounded-none w-full">
              <div>
                <ItemMedia variant="image">
                  <div className="border rounded-lg flex items-center justify-center font-medium h-full w-full bg-muted/50">
                    <span className="text-sm">{item.quantity}</span>
                    <span className="text-xs">x</span>
                  </div>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="flex-col gap-1 items-start">{item.products[0]?.name}</ItemTitle>
                  <ItemDescription className="font-medium text-muted-foreground">
                    {currencyFormatter.format(item.unit_value)} un
                  </ItemDescription>
                </ItemContent>
                <ItemActions className="font-medium">{currencyFormatter.format(item.total_value)}</ItemActions>
              </div>
            </Item>
          ))}

          {hasMore && (
            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
              {hiddenItems.map((item) => (
                <Item asChild key={item.id} className="border-0 border-t border-muted rounded-none w-full">
                  <div>
                    <ItemMedia variant="image">
                      <div className="border rounded-lg flex items-center justify-center font-medium h-full w-full bg-muted/50">
                        <span className="text-sm">{item.quantity}</span>
                        <span className="text-xs">x</span>
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="flex-col gap-1 items-start">{item.products[0]?.name}</ItemTitle>
                      <ItemDescription className="font-medium text-muted-foreground">
                        {currencyFormatter.format(item.unit_value)} un
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions className="font-medium">{currencyFormatter.format(item.total_value)}</ItemActions>
                  </div>
                </Item>
              ))}
            </CollapsibleContent>
          )}

          {hasMore && (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-foreground  ">
                {expanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Mostrar menos
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Ver mais {hiddenCount} {hiddenCount === 1 ? 'item' : 'itens'}
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          )}
        </Collapsible>
      )}
    </div>
  )
}
