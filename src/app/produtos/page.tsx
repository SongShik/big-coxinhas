import { Plus } from 'lucide-react'
import Link from 'next/link'

import { productsColumns } from '@/components/products/productsColumns'
import { DataTable } from '@/components/table/data-table'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default async function Produtos() {
  const { data: products, error } = await supabase.from('products').select('*')

  console.log(error)
  return (
    <>
      <div className="bg-background px-2 py-4 rounded-lg mt-6">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
          <div>
            <h1 className="md:text-3xl text-base font-medium">Produtos</h1>
            <p className="text-muted-foreground md:mt-2 text-sm md:text-base">Gerencie os produtos</p>
          </div>
          <Button asChild size="lg">
            <Link href="/produtos/criar">
              <Plus className="h-4 w-4" />
              Novo
            </Link>
          </Button>
        </div>
      </div>
      {products && (
        <div className="bg-background px-2 py-4 rounded-lg mt-6">
          <DataTable columns={productsColumns} data={products} />
        </div>
      )}
      <div className="mt-6"></div>
    </>
  )
}
