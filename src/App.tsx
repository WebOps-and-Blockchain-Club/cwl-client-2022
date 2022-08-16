// import Map from './components/Map'
import { Router, Switch, Route } from 'wouter'
// import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

import Home from './pages/Home';
const App = () => {
  return (
    <>
      <Router base='/'>
        <Switch>
          <Route
            component={() => <Home />}
          />
          <Route
          />
        </Switch>
      </Router>
    </>
  )
}
export default App
