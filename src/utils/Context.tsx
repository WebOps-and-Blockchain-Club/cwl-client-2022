import { Dispatch, SetStateAction, createContext } from 'react'
interface coordProp {
  lat: number
  lng: number
}
interface ContextProps {
  coord: coordProp
  setCoord: Dispatch<
    SetStateAction<{
      lat: number
      lng: number
    }>
  >
}
const Data: ContextProps = {
  coord: {
    lat: 13.0827,
    lng: 80.2707,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCoord: () => {},
}
export default createContext(Data)
