import MinObject from '@/types/min-object.type'
import SortDirection from './sort-direction.type'

type SelectedSort<T extends MinObject> = {
  key: keyof T
  direction: SortDirection
}

export default SelectedSort
