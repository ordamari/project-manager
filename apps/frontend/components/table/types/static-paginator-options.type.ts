type StaticPaginatorOptions = {
  itemsPerPage: number
  page?: number
  handlePageChange?: (page: number) => void
  handleRowsPerPageChange?: (rowsPerPage: number) => void | Promise<void>
}

export default StaticPaginatorOptions
