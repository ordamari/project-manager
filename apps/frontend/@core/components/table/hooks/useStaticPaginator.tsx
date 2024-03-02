import { useCallback, useEffect, useMemo, useState } from 'react'
import StaticPaginatorOptions from '../types/static-paginator-options.type'

function useStaticPaginator<T>(staticPaginatorOptions: StaticPaginatorOptions | undefined, data: T[]) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(staticPaginatorOptions?.itemsPerPage ?? 10)

  const pages = useMemo(
    () => Math.ceil(data.length / (staticPaginatorOptions?.itemsPerPage ?? 1)),
    [data, staticPaginatorOptions?.itemsPerPage]
  )

  const isControlled = useMemo(
    () => staticPaginatorOptions?.page !== undefined && staticPaginatorOptions?.handlePageChange !== undefined,
    [staticPaginatorOptions]
  )

  const currentPage = useMemo(
    () => (isControlled ? staticPaginatorOptions?.page ?? 0 : page),
    [page, staticPaginatorOptions, isControlled]
  )

  const handlePageChange = useCallback(
    (page: number) => {
      if (isControlled && staticPaginatorOptions?.handlePageChange) {
        staticPaginatorOptions.handlePageChange(page)
      } else {
        setPage(page)
      }
    },
    [isControlled, staticPaginatorOptions]
  )

  const handleRowsPerPageChange = useCallback(
    (rowsPerPage: number) => {
      if (isControlled && staticPaginatorOptions?.handleRowsPerPageChange) {
        staticPaginatorOptions.handleRowsPerPageChange(rowsPerPage)
      } else {
        setRowsPerPage(rowsPerPage)
      }
    },
    [isControlled, staticPaginatorOptions]
  )

  const pageData = useMemo(() => {
    const itemsPerPage = staticPaginatorOptions?.itemsPerPage ?? rowsPerPage

    return data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  }, [staticPaginatorOptions?.itemsPerPage, rowsPerPage, data, currentPage])

  useEffect(() => {
    handlePageChange(0)
  }, [data, handlePageChange])

  return [currentPage, handlePageChange, rowsPerPage, handleRowsPerPageChange, pages, pageData] as const
}
export default useStaticPaginator
