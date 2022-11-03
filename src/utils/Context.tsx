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
    lat: 0,
    lng: 0,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCoord: () => {},
}
export default createContext(Data)
