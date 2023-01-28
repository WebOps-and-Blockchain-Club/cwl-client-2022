const getColorByDepth = (depth: number, flagged: boolean): string => {
  if (flagged) return '#9d00ff'
  return depth > 175
    ? '#d00000'
    : depth > 100
    ? '#e85d04'
    : depth > 55
    ? '#03045e'
    : depth > 20
    ? '#0077b6'
    : '#219ebc'
}

export default getColorByDepth
