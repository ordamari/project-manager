import { TableCell, TableRow as _TableRow } from '@/components/ui/table'

import MinObject from '@/types/min-object.type'
import KeyMap from '../types/key-map.type'
import RenderMap from '../types/render-map.type'
import Action from '../types/action.type'
import { Button } from '@/components/ui/button'
import Icon from '@/components/icon'

type TableRowProps<T extends MinObject> = {
  dataItem: T
  keyMap: KeyMap<T>
  renderMap: RenderMap<T>
  actions: Action<T>[]
}

function TableRow<T extends MinObject>({ dataItem, keyMap, renderMap, actions }: TableRowProps<T>) {
  return (
    <_TableRow>
      {Object.keys(keyMap).map(key => {
        const k = key as keyof T
        const renderFn = renderMap[k]
        const value = renderFn ? renderFn(dataItem[k], dataItem) : dataItem[k]

        return <TableCell key={key}>{value}</TableCell>
      })}
      {actions.length > 0 && (
        <TableCell>
          <div className='flex gap-2 items-center'>
            {actions.map(action => {
              const onClick = () => action.onClick(dataItem)

              return (
                <Button variant='link' key={action.label} onClick={onClick}>
                  {action.icon && <Icon className='w-5 h-5' name={action.icon} />} {action.label && action.label}
                </Button>
              )
            })}
          </div>
        </TableCell>
      )}
    </_TableRow>
  )
}

export default TableRow
