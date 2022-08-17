import { Router, Switch, Route } from 'wouter'
import DataSubmission from './components/DataSubmission/DataSubmission'
import Home from './pages/Home'
const App = () => {
  return (
    <>
      <Router base='/'>
        <Switch>
          <Route
            component={() => (
              <div>
                <Home />
                <DataSubmission />
              </div>
            )}
          />
          <Route />
        </Switch>
      </Router>
    </>
  )
}
export default App
