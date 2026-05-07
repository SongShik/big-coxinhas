import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ClientsList } from '@/components/lists/clientsList'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function Clientes() {
  const { data: clients, error } = await supabase.from('clients').select('*').filter('active', 'eq', true)

  return (
    <>
      <div className="bg-background px-2 py-4 rounded-lg mt-6">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
          <div>
            <h1 className="md:text-3xl text-base font-medium">Clientes</h1>
            <p className="text-muted-foreground md:mt-2 text-sm md:text-base">Gerencie os clientes</p>
          </div>
          <Button asChild size="lg">
            <Link href="/clientes/criar">
              <Plus className="h-4 w-4" />
              Novo
            </Link>
          </Button>
        </div>
      </div>
      {clients && <ClientsList clients={clients} />}
    </>
  )
}
