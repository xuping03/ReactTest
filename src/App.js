import React from 'react';
import {Provider}from 'react-redux'
//import logo from './logo.svg';
import './App.css';
import ReduxTest from './components/ReduxTest';
import store from './store';
import RouteSample from './components/RouteSample';

function App() {
  return (
    <div>
      {/* <Provider store={store}>
         <ReduxTest/>
      </Provider> */}
      <Provider store={store}>
      <RouteSample/>
      </Provider>
      
    </div>
  );
}

export default App;
