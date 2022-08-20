import React, { useState, createContext } from 'react' // eslint-disable-line
// import { Router, Routes, Route, Redirect } from 'wouter'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import VolunteerRegistrationForm from './pages/VolunteerSide/VolunteerRegistrationForm'
import VolunteerLogin from './pages/VolunteerSide/VolunteerLogin'
import VolunteerDashboard from './pages/VolunteerSide/VolunteerDashboard'
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
      <Router basename='/volunteer'>
        <div className='content'>
          <Routes>
            <Route
              // exact
              path='/register'
              element={<VolunteerRegistrationForm volunteerList={data} err={error} />}
            />
            <Route
              // exact
              path='/login'
              element={<VolunteerLogin volunteerList={data} err={error} />}
            />
            <Route
              // exact
              path='/dashboard/:id'
              element={localStorage.getItem('USER') ? <VolunteerDashboard /> : <Link to='/login' />}
            />
          </Routes>
        </div>
      </Router>
    </>
    // </VolunteerListContext.Provider>
  )
}

export default App
