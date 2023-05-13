export const transformFilter = (
  filterData: { id: number; name: string },
  formatNameCallback?: (value: string) => string
) => {
  const name = formatNameCallback
    ? formatNameCallback(filterData.name)
    : filterData.name
  const result = { id: filterData.id, name }

  return result
}
