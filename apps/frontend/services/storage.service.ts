const storageService = {
  get,
  set
}

const ERROR_MESSAGE = 'Server side rendering is not supported'

function get<T>(key: string) {
  if (typeof window === 'undefined') return undefined
  const stringItem = localStorage.getItem(key)
  if (!stringItem) return null
  const item = JSON.parse(stringItem)

  return item as T
}

function set<T>(key: string, value: T) {
  if (typeof window === 'undefined') throw new Error(ERROR_MESSAGE)
  if (!value) return
  const stringItem = JSON.stringify(value)
  localStorage.setItem(key, stringItem)
}

export default storageService
