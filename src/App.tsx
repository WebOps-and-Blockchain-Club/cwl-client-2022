import { Router, Switch, Route } from 'wouter'
import Data from './utils/Context'
import { useState } from 'react'
import DataSubmission from './components/DataSubmission/DataSubmission'
import Home from './pages/Home'
const App = () => {
  const [location, setLocation] = useState({ lat: 13.0827, lng: 80.2707 })
  return (
    <>
      <Data.Provider value={{ location, setLocation }}>
        <Router base='/'>
          <Switch>
            <Route
              component={() => (
                <div>
                  <Home />
                  <DataSubmission />
                </div>
              )}
            />
            <Route />
          </Switch>
        </Router>
      </Data.Provider>
    </>
  )
}
export default App
