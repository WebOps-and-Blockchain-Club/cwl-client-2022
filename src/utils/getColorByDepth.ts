const getColorByDepth = (depth: number): string => {
  return depth > 150 ? '#ff0000' : depth > 100 ? '#ff6f0f' : depth > 50 ? '#ffff66' : '#66ccff'
}

export default getColorByDepth
