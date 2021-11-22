import './App.css';
import Register from './Register';
import Home from './Home';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { LoginContext } from "./Store/Context";
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  return (
    
      <Router>
        <Switch>
          <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            <Route exact path="/register"  component={Register}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/login' component={Login}/>
            </LoginContext.Provider>
        </Switch>
      </Router>

  );
}



export default App;
