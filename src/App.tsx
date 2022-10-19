import { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Router, Switch, Route, Redirect } from 'wouter'
import { InMemoryCache, ApolloProvider, ApolloClient } from '@apollo/client'
import VolunteerRegistrationForm from './pages/VolunteerSide/VolunteerRegistrationForm'
import VolunteerLogin from './pages/VolunteerSide/VolunteerLogin'
import Admin from './pages/Admin'
import useCheckUser from './hooks/useCheckUser'
import User from './interfaces/User'
import NavBar from '../src/components/NavBar'
import Data from './utils/Context'
import Language from './utils/lang'
import Home from './pages/Home'
import ComplaintPortal from './pages/ComplaintPortal/complaintPortal'
import FrontPage from './pages/FrontPage/FrontPage'
import './styles/frontpage.css'
const BACKEND_URL: string = process.env.REACT_APP_BACKEND_URL || ''

const client = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache(),
})

function App() {
  const user: User | null = useCheckUser()
  const [coord, setCoord] = useState({ lat: 13.0827, lng: 80.2707 })
  const [checked, setChecked] = useState(true)

  return (
    <ApolloProvider client={client}>
      <Data.Provider value={{ coord, setCoord }}>
        <Language.Provider value={{ checked, setChecked }}>
          <NavBar />
          <Router>
            <Switch>
              <Route
                // exact
                path='/admin/dashboard'
                component={() => (!user ? <Redirect to='/admin/login' /> : <Admin />)}
              />
              <Route path='/' component={FrontPage} />
              <Route path='/map' component={Home} />
              <Route path='/complaint' component={ComplaintPortal} />
              <Route
                // exact
                path='/volunteer/register'
                component={() => <VolunteerRegistrationForm err={''} />}
              />
              <Route
                // exact
                path='/admin/login'
                component={() => <VolunteerLogin err={''} />}
              />
              <Route path='/:rest*' component={() => <Redirect to='/admin/login' />} />
            </Switch>
          </Router>
        </Language.Provider>
      </Data.Provider>
    </ApolloProvider>
  )
}

export default App
