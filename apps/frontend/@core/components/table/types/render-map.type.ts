import MinObject from '@/types/min-object.type'

type RenderMap<T extends MinObject> = {
  [K in keyof Partial<T>]: (itemPart: T[K], item: T) => React.ReactNode
}

export default RenderMap
