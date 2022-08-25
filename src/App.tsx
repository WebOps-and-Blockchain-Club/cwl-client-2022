import React, { useState, createContext } from 'react' // eslint-disable-line
import { Router, Switch, Route, Redirect } from 'wouter'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import VolunteerRegistrationForm from './pages/VolunteerSide/VolunteerRegistrationForm'
import VolunteerLogin from './pages/VolunteerSide/VolunteerLogin'
import VolunteerDashboard from './pages/VolunteerSide/VolunteerDashboard'
import useFetch from './hooks/useFetch'
import useCheckUser from './hooks/useCheckUser'
import Volunteer from './interfaces/VolunteerSide/Volunteer'
import User from './interfaces/User'

function App() {
  // const [volunteerList, setVolunteerList]: [Volunteer[], any] = useState([]);
  // const { data } = useFetch("http://localhost:5000/volunteers/");
  // setVolunteerList(data);
  const {
    data,
    isPending, // eslint-disable-line
    error, //eslint-disable-line
  }: {
    data: Volunteer[] | null
    isPending: boolean
    error: string
  } = useFetch('http://localhost:5000/volunteers/')
  const user: User | null = useCheckUser()

  return (
    // <VolunteerListContext.Provider value={volunteerList}>
    <>
      <Router base='/volunteer'>
        <div className='content'>
          <Switch>
            <Route
              // exact
              path='/register'
              component={() =>
                user ? (
                  <Redirect to='/dashboard' />
                ) : (
                  <VolunteerRegistrationForm volunteerList={data} err={error} />
                )
              }
            />
            <Route
              // exact
              path='/login'
              component={() =>
                user ? (
                  <Redirect to='/dashboard' />
                ) : (
                  <VolunteerLogin volunteerList={data} err={error} />
                )
              }
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
    </>
  )
}

export default App
