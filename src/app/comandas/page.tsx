import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ComandasList } from '@/components/lists/comandasList'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function Comandas() {
  const { data: comandas } = await supabase
    .from('comandas')
    .select(
      `
    id:id,
    data_order:date_order,
    total_comanda:total_comanda,
    clients:client_id (name)
  `,
    )
    .filter('active', 'eq', true)
    .order('date_order', { ascending: true })

  return (
    <>
      <div className="bg-background px-2 py-4 rounded-lg mt-6">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
          <div>
            <h1 className="md:text-3xl text-base font-medium">Comandas</h1>
            <p className="text-muted-foreground md:mt-2 text-sm md:text-base">Gerencie as comandas</p>
            <p className="text-muted-foreground md:mt-2 text-sm md:text-base">
              fazer filtragem por cliente, data e organizar por data tb ou tipo, hoje, ontem, amanhã, quem sabe um
              datapicker
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/comandas/criar">
              <Plus className="h-4 w-4" />
              Nova
            </Link>
          </Button>
        </div>
      </div>

      {/* <pre>{JSON.stringify(comandas, null, 2)}</pre> */}
      {comandas && <ComandasList comandas={comandas} />}
    </>
  )
}
