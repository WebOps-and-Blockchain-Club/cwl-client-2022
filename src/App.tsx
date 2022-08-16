import React, { useState, createContext } from 'react' // eslint-disable-line
import { Router, Switch, Route } from 'wouter'
import VolunteerRegistrationForm from './pages/VolunteerSide/VolunteerRegistrationForm'
import VolunteerLogin from './pages/VolunteerSide/VolunteerLogin'
// import useFetch from "./hooks/useFetch";
// import Volunteer from "./interfaces/Volunteer";

// const VolunteerListContext = createContext([]);

function App() {
  // const [volunteerList, setVolunteerList]: [Volunteer[], any] = useState([]);
  // const { data } = useFetch("http://localhost:5000/volunteers/");
  // setVolunteerList(data);

  return (
    // <VolunteerListContext.Provider value={volunteerList}>
    <>
      <Router base='/volunteer'>
        <Switch>
          <Route
            // exact
            path='/register'
            component={() => <VolunteerRegistrationForm />}
          />
          <Route
            // exact
            path='/login'
            component={() => <VolunteerLogin />}
          />
        </Switch>
      </Router>
      <Router base='/user'>
        <Switch>
          <Route
            // exact
            path='/something'
            component={() => <VolunteerRegistrationForm />}
          />
          <Route
            // exact
            path='/login'
            component={() => <VolunteerLogin />}
          />
        </Switch>
      </Router>
    </>
    // </VolunteerListContext.Provider>
  )
}

export default App
