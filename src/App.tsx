import { Switch, Route } from 'wouter'
import Data from './utils/Context'
import { useState } from 'react'
import DataSubmission from './components/DataSubmission/DataSubmission'
import Home from './pages/Home'
import SliderFunction from './components/DataSubmission/slider'

const App = () => {
  const [coord, setCoord] = useState({ lat: 13.0827, lng: 80.2707 })
  return (
    <>
      <Data.Provider value={{ coord, setCoord }}>
        <Switch>
          <Route path='/map' component={Home} />
          <Route path='/' component={DataSubmission} />
        </Switch>
      </Data.Provider>
    </>
  )
}
export default App
