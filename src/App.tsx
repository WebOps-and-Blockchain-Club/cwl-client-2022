import React, { useState, createContext } from 'react' // eslint-disable-line
import { Router, Switch, Route, Redirect } from 'wouter'
import { InMemoryCache, ApolloProvider, ApolloClient } from '@apollo/client'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import VolunteerRegistrationForm from './pages/VolunteerSide/VolunteerRegistrationForm'
import VolunteerLogin from './pages/VolunteerSide/VolunteerLogin'
import VolunteerDashboard from './pages/VolunteerSide/VolunteerDashboard'
// import useFetch from './hooks/useFetch'
import useCheckUser from './hooks/useCheckUser'
import User from './interfaces/User'

const BACKEND_URL: string = process.env.REACT_APP_BACKEND_URL || ''

const client = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache(),
})

function App() {
  const user: User | null = useCheckUser()

  return (
    <ApolloProvider client={client}>
      <Router base='/volunteer'>
        <div className='content'>
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
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
