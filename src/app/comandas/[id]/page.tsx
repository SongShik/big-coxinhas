import { formatDate } from 'date-fns'

import { AvatarIcon } from '@/components/comandas/avatarIcon'
import { DateBadge } from '@/components/comandas/dateBadge'
import { ItensComanda } from '@/components/comandas/itensComanda'
import PaymentBadge from '@/components/comandas/paymentBadge'
import { PaymentsProgress } from '@/components/comandas/paymentsProgress'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { supabase } from '@/lib/supabase'
import { currencyFormatter } from '@/utils/currencyFormatter'

type Props = {
  params: {
    id: string
  }
}

export default async function ComandaDetalhes({ params }: Props) {
  const { id } = await params

  const { data: comandas, error } = await supabase
    .from('comandas')
    .select(
      `
        id:id,
        data_order:date_order,
        total_comanda:total_comanda,
        clients:client_id (name),
        payments (id, total, date, method_payment),
        itens_comanda(id, products(id, name), unit_value, total_value, quantity)
        `,
    )
    .filter('active', 'eq', true)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Erro ao buscar comanda:', error)
    return <div>Erro ao carregar comanda</div>
  }
  const valorPago = comandas.payments.reduce((acc, item) => acc + item.total, 0)

  return (
    <>
      <div className="bg-background px-2 rounded-lg mt-6">
        <div className="flex flex-wrap items-center">
          <Item asChild className="border-0 border-muted rounded-none w-full">
            <div>
              <ItemMedia>
                <AvatarIcon name={comandas.clients[0]?.name} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="flex-col gap-1 items-start">
                  {comandas.clients[0]?.name}
                  <DateBadge date={new Date(comandas.data_order)} />
                </ItemTitle>
                <ItemDescription className="flex justify-between w-full">
                  <span className="font-medium text-muted-foreground">
                    {currencyFormatter.format(comandas.total_comanda)}
                  </span>
                  <PaymentBadge payments={comandas.payments} total={comandas.total_comanda} />
                </ItemDescription>
              </ItemContent>
            </div>
          </Item>
        </div>
      </div>

      <ItensComanda itens={comandas.itens_comanda} />

      <div className="bg-background px-4 py-4 rounded-lg mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-base font-medium">Pagamentos</p>
          <PaymentBadge payments={comandas.payments} total={comandas.total_comanda} />
        </div>

        <PaymentsProgress total_comanda={comandas.total_comanda} valorPago={valorPago} />

        <div className="space-y-2">
          <div className="flex justify-between items-center border-muted pb-2">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="text-sm font-medium">{currencyFormatter.format(comandas.total_comanda)}</span>
          </div>
          {comandas.payments.length > 0 &&
            comandas.payments.map((payment, index) => (
              <div key={payment.id} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {payment.method_payment} •{' '}
                  <span className="text-xs">{formatDate(new Date(payment.date), 'dd/MM')}</span>
                </span>
                <span className="text-sm font-medium">{currencyFormatter.format(payment.total)}</span>
              </div>
            ))}
          <div className="flex justify-between items-center border-t border-muted pt-2">
            <span className="text-sm font-medium">Total pago</span>
            <span className="text-sm font-medium">{currencyFormatter.format(valorPago)}</span>
          </div>
        </div>
      </div>
      {/* <pre>ola {JSON.stringify(comandas, null, 2)}</pre> */}
    </>
  )
}
