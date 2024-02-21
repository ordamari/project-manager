import IconName from '@/types/icon-name.type'
import MinObject from '@/types/min-object.type'

type Action<T extends MinObject> = {
  label?: string
  icon?: IconName
  onClick: (item: T) => void
}
export default Action
