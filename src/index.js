import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import react from 'react';

const bigHeader = 
  <h1>This is my portfolio</h1>
;

class NavBar extends React.Component {
  render() {
    return (bigHeader);
  } 
}


ReactDOM.render(
  <NavBar/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
