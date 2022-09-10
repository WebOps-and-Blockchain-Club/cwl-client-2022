import User from '../interfaces/User'

const useCheckUser = (): User | null => {
  const user = localStorage.getItem('USER')
  if (user) {
    return JSON.parse(user)
  }
  return null
}

export default useCheckUser
