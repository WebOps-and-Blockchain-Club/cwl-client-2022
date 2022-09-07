import React from 'react'
import MapNav from '../components/Map/Map_Nav'
import '../styles/Maps/MapDisplay.css'
import '../styles/Maps/Marker.css'
import DataSubmission from '../components/DataSubmission/DataSubmission'
import { Switch, Route } from 'wouter'
import NavBar from '../components/NavBar/NavBar'
import Map from '../components/Map/Map'
const Home = () => (
  <div>
    <MapNav />
    {/* <Switch>
      <Route path='/' component={DataSubmission} />
      <Route
        path='/map'
        component={() => (
          <div>
            Hi
            <NavBar />
            <div>
                          <Map /> 
            </div>
          </div>
        )}
      />
    </Switch>*/}
  </div>
)

export default Home
