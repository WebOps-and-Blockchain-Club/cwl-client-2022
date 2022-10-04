import { Dispatch, SetStateAction, createContext } from 'react'

interface Lang {
  checked: boolean
  setChecked: Dispatch<SetStateAction<boolean>>
}

const Language: Lang = {
  checked: true,
   // eslint-disable-next-line @typescript-eslint/no-empty-function
  setChecked: () => {},
}
export default createContext(Language)
