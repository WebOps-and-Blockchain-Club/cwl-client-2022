import { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Router, Switch, Route, Redirect } from 'wouter'
import { InMemoryCache, ApolloProvider, ApolloClient } from '@apollo/client'
import VolunteerRegistrationForm from './pages/VolunteerSide/VolunteerRegistrationForm'
import VolunteerLogin from './pages/VolunteerSide/VolunteerLogin'
import Admin from './pages/Admin'
import useCheckUser from './hooks/useCheckUser'
import User from './interfaces/User'
import Data from './utils/Context'
import NavBar from './components/General/NavBar'
import Language from './utils/lang'
import Map from './components/HomePage/Map'
import ComplaintPortal from './pages/ComplaintPortal/complaintPortal'
import FrontPage from './pages/FrontPage/FrontPage'
import './styles/frontpage.css'
import WhatsAppModal from './components/General/WhatsAppModal'
const BACKEND_URL: string = process.env.REACT_APP_BACKEND_URL || ''

const client = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache(),
})

function App() {
  const user: User | null = useCheckUser()
  const [coord, setCoord] = useState({ lat: 0, lng: 0 })
  const [checked, setChecked] = useState<boolean>(true)
  const [showWhatsAppInstructionsModal, setShowWhatsAppInstructionsModal] = useState<boolean>(false)

  return (
    <ApolloProvider client={client}>
      <Data.Provider value={{ coord, setCoord }}>
        <Language.Provider value={{ checked, setChecked }}>
          <NavBar props={{ showWhatsAppInstructionsModal, setShowWhatsAppInstructionsModal }} />
          <Router>
            <Switch>
              <Route
                path='/admin/dashboard'
                component={() => (!user ? <Redirect to='/admin/login' /> : <Admin />)}
              />
              <Route path='/' component={FrontPage} />
              <Route path='/map' component={Map} />
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
          <WhatsAppModal
            props={{ showWhatsAppInstructionsModal, setShowWhatsAppInstructionsModal }}
          />
        </Language.Provider>
      </Data.Provider>
    </ApolloProvider>
  )
}

export default App
