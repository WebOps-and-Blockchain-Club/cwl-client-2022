import React, { useState } from 'react'
import { Router, Switch, Route, Redirect } from 'wouter'
import { InMemoryCache, ApolloProvider, ApolloClient } from '@apollo/client'
import VolunteerRegistrationForm from './pages/VolunteerSide/VolunteerRegistrationForm'
import VolunteerLogin from './pages/VolunteerSide/VolunteerLogin'
import VolunteerDashboard from './pages/VolunteerSide/VolunteerDashboard'
import useCheckUser from './hooks/useCheckUser'
import User from './interfaces/User'
import DataSubmission from './components/DataSubmission'
import NavBar from '../src/components/NavBar'
import Data from './utils/Context'
import Home from './pages/Home'
import ComplaintPortal from './pages/ComplaintPortal/complaintPortal'
import FrontPage from './pages/FrontPage/FrontPage'
import 'react-accessible-accordion/dist/fancy-example.css';
import './styles/frontpage.css'
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
        <Router base='/volunteer'>
          <Switch>
            <Route
              // exact
              path='/register'
              component={() =>
                user ? <Redirect to='/dashboard' /> : <VolunteerRegistrationForm err={''} />
              }
            />
            <Route
              // exact
              path='/login'
              component={() => (user ? <Redirect to='/dashboard' /> : <VolunteerLogin err={''} />)}
            />
            <Route
              // exact
              path='/dashboard'
              component={() => (user ? <VolunteerDashboard /> : <Redirect to='/login' />)}
            />
            <Route path='/:rest*' component={() => <Redirect to='/login' />} />
          </Switch>
        </Router>
        <Router>
          <Switch>
            <Route path='/' component={DataSubmission} />
            <Route path='/map' component={Home} />
            <Route path='/complaint' component={ComplaintPortal} />
            <Route path="/frontpage" component={FrontPage} />
          </Switch>
        </Router>
      </Data.Provider>
    </ApolloProvider>
  )
}

export default App
