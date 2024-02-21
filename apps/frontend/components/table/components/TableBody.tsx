import { TableBody as _TableBody } from '@/components/ui/table'

import MinObject from '@/types/min-object.type'
import KeyMap from '../types/key-map.type'
import RenderMap from '../types/render-map.type'
import Action from '../types/action.type'
import TableRow from './TableRow'

type TableBodyProps<T extends MinObject> = {
  data: T[]
  keyMap: KeyMap<T>
  renderMap: RenderMap<T>
  actions: Action<T>[]
}

function TableBody<T extends MinObject>({ data, keyMap, renderMap, actions }: TableBodyProps<T>) {
  return (
    <_TableBody>
      {data.map(item => (
        <TableRow key={item.id} dataItem={item} keyMap={keyMap} renderMap={renderMap} actions={actions} />
      ))}
    </_TableBody>
  )
}

export default TableBody
