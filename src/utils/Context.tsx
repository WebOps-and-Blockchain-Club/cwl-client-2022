import { Dispatch, SetStateAction, createContext } from 'react'
interface locationProp {
  lat: number
  lng: number
}
interface ContextProps {
  location: locationProp
  setLocation: Dispatch<
    SetStateAction<{
      lat: number
      lng: number
    }>
  >
}
const Data: ContextProps = {
  location: {
    lat: 13.0827,
    lng: 80.2707,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLocation: () => {},
}
export default createContext(Data)
