const getColorByDepth = (depth: number): string => {
  return depth > 150 ? '#03045e' : depth > 100 ? '#023e8a' : depth > 50 ? '#0077b6' : '#0096c7'
}

export default getColorByDepth
