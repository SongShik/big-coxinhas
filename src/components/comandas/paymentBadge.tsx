import { useEffect, useState } from 'react'

import { Badge } from '../ui/badge'

type Payment = {
  id: string
  total: number
}

type PaymentStatus = 'loading' | 'paid' | 'partial' | 'unpaid' | 'error' | 'paidMore'

function getStatus(payments: Payment[], total: number): PaymentStatus {
  const amountPaid = payments.reduce((sum, p) => sum + p.total, 0)

  if (amountPaid <= 0) return 'unpaid'
  if (amountPaid === total) return 'paid'
  if (amountPaid > total) return 'paidMore'
  return 'partial'
}

const STATUS_CONFIG: Record<PaymentStatus, { label: string; className: string }> = {
  loading: { label: '', className: 'bg-gray-100 text-gray-500 w-18 h-5' },
  paid: { label: 'Pago', className: 'bg-green-100 text-green-700' },
  partial: { label: 'Parcial', className: 'bg-yellow-100 text-yellow-700' },
  unpaid: { label: 'Não pago', className: 'bg-red-100 text-red-700' },
  error: { label: 'Erro', className: 'bg-red-100 text-red-700' },
  paidMore: { label: 'Pago a mais', className: 'bg-green-100 text-green-700' },
}

export default function PaymentBadge({ payments, total }: { payments: Payment[]; total: number }) {
  const [status, setStatus] = useState<PaymentStatus>('loading')

  useEffect(() => {
    setStatus(getStatus(payments, total))
  }, [payments, total])

  const { label, className } = STATUS_CONFIG[status]

  return <Badge className={className}>{label}</Badge>
}
