import { formatDate } from 'date-fns'

export function DateBadge({ date }: { date: Date }) {
  const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

  const normalizedDate = normalize(date)
  const normalizedToday = normalize(new Date())

  const diffDays = Math.round((normalizedDate.getTime() - normalizedToday.getTime()) / (1000 * 60 * 60 * 24))

  const isYesterday = diffDays === -1
  const isToday = diffDays === 0
  const isTomorrow = diffDays === 1
  const isNextWeek = diffDays >= 2 && diffDays <= 7
  const isOld = diffDays < -1

  return (
    <>
      <div className="text-sm font-normal text-muted-foreground">
        {formatDate(date, 'dd/MM')}
        <span className="mx-1">•</span>
        {isOld && <span className="text-muted-foreground">Antiga</span>}
        {isYesterday && <span className="text-red-400">Ontem</span>}
        {isToday && <span className="text-green-700">Hoje</span>}
        {isTomorrow && <span className="text-blue-700">Amanhã</span>}
        {isNextWeek && <span className="text-purple-700">Próxima semana</span>}
      </div>
    </>
  )
}
