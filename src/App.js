// These are NPM Modules from https://npmjs.com/
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "./App.css"

// These are our components
import NavigationComponent from './components/nav/nav.jsx' // This is our custom navigation component

// These are our pages
import Home from './pages/HomePage.jsx'
import Projects from './pages/ProjectPage.jsx'
import Login from './pages/LoginPage.jsx'

const App = () => {
  return (
    <div> 
      <Router>
        {/*  We define our links inside here. This is how we change pages. */}
        <NavigationComponent />

        {/* When our route changes in the URL, we then render the correct page */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/project/:id">
            <Projects />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
