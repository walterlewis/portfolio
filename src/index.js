import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import react from 'react';
import CardSpace from './Projects';
import NavBar from './NavBar';

const bigHeader = 
  <h1>Welcome to Walter's portfolio!</h1>
;


// const greeting = <h2>Hi myki :)</h2>;

const projects = ["CSE443 neural net mapping", 
  "2d Unity action game",
  "3d turn based unity adventure game",
  "Weather forecast web application",
  "Agile developed course library project",
  "and most importantly....this website!",  
];

const projectsList = 
  projects.map(
    (project) =>
    <li>{project}</li>
);

const table = 
  <div>
    I will be including the projects below:
  </div>

class TableProjects extends React.Component {
  render() {
    return(
      <div>
        {table}
        <br></br>
        <ul>
          {projectsList}
        </ul>
      </div>
    );
  }
}




ReactDOM.render(
  <div>
    <NavBar />
    <TableProjects />
    <CardSpace />
  </div>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
