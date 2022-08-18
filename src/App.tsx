import React, { useState, createContext } from 'react' // eslint-disable-line
import { Router, Switch, Route } from 'wouter'
import VolunteerRegistrationForm from './pages/VolunteerSide/VolunteerRegistrationForm'
import VolunteerLogin from './pages/VolunteerSide/VolunteerLogin'
import useFetch from './hooks/useFetch'
import Volunteer from './interfaces/VolunteerSide/Volunteer'

// const VolunteerListContext = createContext([]);

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

  return (
    // <VolunteerListContext.Provider value={volunteerList}>
    <>
      <Router base='/volunteer'>
        <Switch>
          <Route
            // exact
            path='/register'
            component={() => <VolunteerRegistrationForm volunteerList={data} err={error} />}
          />
          <Route
            // exact
            path='/login'
            component={() => <VolunteerLogin volunteerList={data} err={error} />}
          />
        </Switch>
      </Router>
    </>
    // </VolunteerListContext.Provider>
  )
}

export default App
