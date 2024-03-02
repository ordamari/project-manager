import MinObject from '@/types/min-object.type'
import KeyMap from '../types/key-map.type'
import SortMap from '../types/sort-map.type'
import SelectedSort from '../types/selected-sort.type'
import Action from '../types/action.type'
import SortDirection from '../types/sort-direction.type'

import { TableHead, TableHeader as _TableHeader, TableRow } from '@/components/ui/table'
import useTranslation from '@core/hooks/useTranslation'
import Icon from '@/components/icon'
import { cn } from '@/lib/utils'

type TableHeaderProps<T extends MinObject> = {
    keyMap: KeyMap<T>
    sortMap?: SortMap<T>
    selectedSort: SelectedSort<T> | null
    setSelectedSort: React.Dispatch<React.SetStateAction<SelectedSort<T> | null>>
    actions: Action<T>[]
}

function TableHeader<T extends MinObject>({
    keyMap,
    sortMap,
    selectedSort,
    actions,
    setSelectedSort,
}: TableHeaderProps<T>) {
    const onChooseSort = (key: keyof T, direction: SortDirection) => {
        setSelectedSort(prev => {
            if (prev?.key === key && prev.direction === direction) return null

            return {
                key,
                direction,
            }
        })
    }

    const t = useTranslation()

    return (
        <_TableHeader>
            <TableRow>
                {Object.entries(keyMap).map(([key, value]) => {
                    const isSelectedSort = selectedSort && selectedSort.key === key
                    const isAscending = isSelectedSort && selectedSort.direction === 'asc'
                    const isDescending = isSelectedSort && selectedSort.direction === 'desc'

                    return (
                        <TableHead key={key}>
                            <div className='flex gap-4 items-center'>
                                {value}
                                {sortMap && sortMap[key as keyof T] && (
                                    <div className='flex flex-col'>
                                        <button
                                            className={cn('w-4 h-4', isAscending ? 'text-primary scale-110' : '')}
                                            onClick={() => onChooseSort(key as keyof T, 'asc')}
                                        >
                                            <Icon className='w-2 h-2' name='arrow-up' />
                                        </button>
                                        <button
                                            className={cn('w-4 h-4', isDescending ? 'text-primary scale-110' : '')}
                                            onClick={() => onChooseSort(key as keyof T, 'desc')}
                                        >
                                            <Icon className='w-2 h-2' name='arrow-bottom' />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </TableHead>
                    )
                })}
                {actions.length > 0 && (
                    <TableHead>
                        <div>{t('table.actions')}</div>
                    </TableHead>
                )}
            </TableRow>
        </_TableHeader>
    )
}

export default TableHeader
