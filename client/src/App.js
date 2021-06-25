import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="App ">
      <Router>
        <div className="w-11/12 my-5 mx-auto max-w-screen-2xl">
          <Navbar />
        </div>
          <div className="w-11/12 m-auto max-w-screen-2xl">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;