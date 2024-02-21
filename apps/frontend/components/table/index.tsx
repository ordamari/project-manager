import { Table as _Table, TableCaption } from '@/components/ui/table'

import MinObject from '@/types/min-object.type'
import StaticPaginatorOptions from './types/static-paginator-options.type'
import KeyMap from './types/key-map.type'
import SortMap from './types/sort-map.type'
import RenderMap from './types/render-map.type'
import Action from './types/action.type'
import { useMemo, useState } from 'react'
import SelectedSort from './types/selected-sort.type'
import useStaticPaginator from './hooks/useStaticPaginator'
import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'

export type TableProps<T extends MinObject> = {
  data: T[]
  keyMap?: KeyMap<T>
  sortMap?: SortMap<T>
  renderMap?: RenderMap<T>
  staticPaginatorOptions?: StaticPaginatorOptions
  actions?: Action<T>[]
  caption?: string
}

const Table = <T extends MinObject>({
  actions,
  data,
  keyMap,
  sortMap,
  renderMap,
  staticPaginatorOptions,
  caption
}: TableProps<T>) => {
  const [selectedSort, setSelectedSort] = useState<SelectedSort<T> | null>(null)
  const renderedKeyMap = useMemo(() => {
    if (keyMap) return keyMap

    return Object.keys(data[0] ?? {}).reduce((acc, key) => {
      const k = key as keyof T
      acc[k] = key

      return acc
    }, {} as KeyMap<T>)
  }, [keyMap, data])

  const sortedData = useMemo(() => {
    if (!selectedSort || !sortMap) return data
    const { key, direction } = selectedSort
    const sortFn = sortMap[key as keyof T]
    if (!sortFn) return data

    return [...data].sort((a, b) => sortFn(a[key as keyof T], b[key as keyof T]) * (direction === 'asc' ? 1 : -1))
  }, [data, selectedSort, sortMap])

  const [staticPage, handleStaticPageChange, staticRowsPerPage, handleRowsPerPageChange, _, staticPageData] =
    useStaticPaginator(staticPaginatorOptions, sortedData)

  const pageData = useMemo(
    () => (staticPaginatorOptions ? staticPageData : sortedData),
    [staticPaginatorOptions, sortedData, staticPageData]
  )

  return (
    <_Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader
        keyMap={renderedKeyMap}
        selectedSort={selectedSort}
        sortMap={sortMap}
        setSelectedSort={setSelectedSort}
        actions={actions ?? []}
      />
      <TableBody
        actions={actions ?? []}
        data={pageData}
        keyMap={renderedKeyMap}
        renderMap={renderMap ?? ({} as RenderMap<T>)}
      />
    </_Table>
  )
}

export default Table
