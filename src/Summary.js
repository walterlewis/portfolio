import React from 'react';

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

const projTitle = 
  <div>
    I will be including the projects below:
  </div>


export class SummarySpace extends React.Component {
    render () {
    return(
            <div class="h-100 p-5 bg-light border rounded-3">
                <h2>{projTitle}</h2>
                <ul>
                    {projectsList}
                </ul>
                <button class="btn btn-outline-secondary" type="button">Example button</button>
            </div>
        );
    }
}

