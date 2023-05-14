export const formatStaffType = (staffType?: string) => {
  switch (staffType) {
    case 'actor':
      return 'actors'
    case 'director':
      return 'directors'
    default:
      return ''
  }
}
