interface Row {
  username: string
  location: string
  contact: number
  helpRequired: string
}

function createData(
  username: string,
  contact: number,
  location: string,
  helpRequired: string,
): Row {
  return { username, location, contact, helpRequired }
}

export default createData
