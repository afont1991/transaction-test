import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './configure-store';
const store = configureStore();


// Commponents
import AppContainer from './App/Container';
import LoginComponent from './App/Components/Login'
import dashboardComponent from './App/Components/Dashboard'

// Assets
import './Assets/css/animate.css';
import 'react-table/react-table.css'
import './Assets/css/App.css';

// Initializing particles for fun
import Particles from 'particlesjs'
window.onload = function() {
  Particles.init({
    selector: '.background',
    connectParticles: true,
  });
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} >
        <IndexRoute component={LoginComponent} />
        <Route path='/dashboard' component={dashboardComponent} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
