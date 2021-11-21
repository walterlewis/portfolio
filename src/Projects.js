import React from 'react';

// we have the project class all set up:
// now need to make a boostrap card for each of them


class project {
    title;
    date;
    size;
    constructor(title, date, size) {
        this.title = title;
        this.date = date;
        this.size = size;
    }
};

//const project_sampleProject = new project("Hey myko!!", "This is a sample project", "Thanks for inspiring me to do this :) <3");
const project_WeatherWebApp = new project("Weather Web app", "May 2021", "Medium");
const project_Unity3dAdventure = new project("Unity 3d Turn-Based adventure game","May 2021","Medium");
const project_AgileCourseDatabase = new project("Agile Course Mapping", "Fall 2020", "Large");

var projects = [project_WeatherWebApp,project_AgileCourseDatabase, project_Unity3dAdventure];

// make projects class
class ProjectCard extends React.Component {
    render () {
        return(
            <div class="col-md">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">{this.props.title}</h5>
                        <p class="card-text">{this.props.date}</p>
                        <p class="card-text">{this.props.size}</p>
                        <a href="_blank" class="btn btn-primary">Go somewhere</a>
                    </div>
                    <div class="card-footer text-muted">
                        2 days ago
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}




class CardSpace extends React.Component {

    outputProjects (projList) {
        return projList.map((proj1) =>
            <ProjectCard title={proj1.title} date={proj1.date} size={proj1.size}/>
        );
    }

    
    
    render() {
        return (
            <div class="h-100 p-5 bg-light border rounded-3">
                <h1>Projects: <br></br></h1>
                <div class="row">
                    {this.outputProjects(projects)}
                </div>
            </div>   
        );
    }
}

export default CardSpace;