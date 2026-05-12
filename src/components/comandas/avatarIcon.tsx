import { Avatar } from '../ui/avatar'

export function AvatarIcon({ name }: { name: string }) {
  return (
    <Avatar className="size-10 bg-laranja-400 after:border-0">
      <div className="flex items-center justify-center h-full w-full text-2xl text-laranja-600">{name.charAt(0)}</div>
    </Avatar>
  )
}
