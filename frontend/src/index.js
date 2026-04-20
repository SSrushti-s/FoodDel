import React from 'react'; //It’s the engine that allows you to use components, State, and Props.
import ReactDOM from 'react-dom/client'; // ReactDOM helps talk to the web browsers DOM to draw the UI
import './index.css';
import App from './App';
// RIGHT: Importing via package name (Standard)
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root')); //This creats the root in DOM
root.render( //This is the command that officially "starts" the app.
  <React.StrictMode> 
    <App />
  </React.StrictMode>
); // </React.StrictMode> it checks your code for potential problems and warnings in the background while you are coding.
//<App />: This is where you place your main component. It kicks off the chain reaction:
//  App loads Home, Home loads Cards, and so on.