const GMT2IST = (date: string) => {
  const temp: string[] = date.split(':')
  if (parseInt(temp[1]) < 30) {
    temp[1] = JSON.stringify(parseInt(temp[1]) + 30)
    temp[0] = JSON.stringify((parseInt(temp[0]) + 5) % 24)
  } else {
    temp[1] = JSON.stringify(parseInt(temp[1]) + 30)
    temp[0] = JSON.stringify((parseInt(temp[0]) + 6) % 24)
  }
  return `${temp[0]}:${temp[1]}:${temp[2]}`
}

export default GMT2IST
