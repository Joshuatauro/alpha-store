import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Category from './pages/Categories';

const App = () => {
  return (
    <div className="App font-barlow">
      <Router>
        <div className="w-11/12 my-5 mx-auto max-w-screen-2xl">
          <Navbar />
        </div>
          <div className="w-11/12 m-auto max-w-screen-2xl">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/category/:categoryName" exact component={Category} />
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
