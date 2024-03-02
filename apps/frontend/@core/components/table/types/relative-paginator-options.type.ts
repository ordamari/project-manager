type RelativePaginatorOptions = {
  pages: number
  handlePageChange: (page: number) => void | Promise<void>
  page?: number
}

export default RelativePaginatorOptions
