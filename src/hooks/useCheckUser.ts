const useCheckUser = () => {
  const user = localStorage.getItem('USER')
  if (user) {
    return JSON.parse(user)
  }
  return null
}

export default useCheckUser
