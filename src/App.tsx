import React, { useState } from 'react'
import { Router, Switch, Route, Redirect } from 'wouter'
import { InMemoryCache, ApolloProvider, ApolloClient } from '@apollo/client'
import VolunteerRegistrationForm from './pages/VolunteerSide/VolunteerRegistrationForm'
import VolunteerLogin from './pages/VolunteerSide/VolunteerLogin'
import Admin from './pages/Admin'
import useCheckUser from './hooks/useCheckUser'
import User from './interfaces/User'
import NavBar from '../src/components/NavBar'
import Data from './utils/Context'
import Home from './pages/Home'
import ComplaintPortal from './pages/ComplaintPortal/complaintPortal'
import FrontPage from './pages/FrontPage/FrontPage'
import 'react-accessible-accordion/dist/fancy-example.css'
import './styles/frontpage.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

const BACKEND_URL: string = process.env.REACT_APP_BACKEND_URL || ''

const client = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache(),
})

function App() {
  const user: User | null = useCheckUser()
  const [coord, setCoord] = useState({ lat: 13.0827, lng: 80.2707 })

  return (
    <ApolloProvider client={client}>
      <Data.Provider value={{ coord, setCoord }}>
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
      </Data.Provider>
    </ApolloProvider>
  )
}

export default App
