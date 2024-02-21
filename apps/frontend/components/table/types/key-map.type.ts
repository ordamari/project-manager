import MinObject from '@/types/min-object.type'

type KeyMap<T extends MinObject> = {
  [K in keyof Partial<T>]: string
}

export default KeyMap
