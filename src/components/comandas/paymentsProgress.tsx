import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { currencyFormatter } from '@/utils/currencyFormatter'

function getStatusBar(valorPago: number, total: number) {
  if (valorPago <= 0) return 'red-700'
  if (valorPago === total) return 'green-700'
  if (valorPago > total) return 'green-700'
  return 'laranja-600'
}

function getStatus(valorPago: number, total: number) {
  if (valorPago <= 0) return 'text-muted-foreground'
  if (valorPago === total) return 'text-green-700'
  if (valorPago > total) return 'text-green-700'
  return 'text-green-700'
}

export function PaymentsProgress({ total_comanda, valorPago }: { total_comanda: number; valorPago: number }) {
  const restante = total_comanda - valorPago
  const statusBar = getStatusBar(valorPago, total_comanda)
  const status = getStatus(valorPago, total_comanda)

  return (
    <div className="border border-muted rounded-lg px-2 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center flex-col w-full gap-1  font-medium">
          <p className="text-sm">Total restante</p>
          <p className={`text-xl text-${statusBar}`}>{currencyFormatter.format(restante <= 0 ? 0 : restante)}</p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center justify-center flex-col w-full gap-1 font-medium">
          <p className="text-sm">Total Pago</p>
          <p className={`text-xl ${status}`}>{currencyFormatter.format(valorPago)}</p>
          {valorPago > total_comanda && (
            <p className={`text-[9px] md:text-xs`}>
              Valor pago a mais: {currencyFormatter.format(valorPago - total_comanda)}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Progress value={(valorPago / total_comanda) * 100 || 0} className={`[&>div]:bg-${statusBar}`} />
      </div>
    </div>
  )
}
