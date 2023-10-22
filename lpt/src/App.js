import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserSigns from './components/UserSigns'; 
import Solve from './components/Solve';
import View from './components/Solve'
import Settings from './components/Settings'; 

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path='/usersigns' element={<UserSigns />} />
              <Route path='/solve' element={<Solve />} />
              <Route path = '/view' element = {<View/> } /> 
              <Route path = '/settings' element = {<Settings/>} /> 
          </Routes>
      </Router>
      
    );
  }
}
export default App;