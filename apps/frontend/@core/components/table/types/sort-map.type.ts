import MinObject from '@/types/min-object.type'

type SortMap<T extends MinObject> = {
  [K in keyof Partial<T>]: (first: T[K], second: T[K]) => number
}

export default SortMap
