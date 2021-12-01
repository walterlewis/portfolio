import React from 'react';
import './Projects.css';
import constructionImg from './underConstruction.png';
import PopUp from "./PopUpWindow";

// we have the project class all set up:
// now need to make a boostrap card for each of them


class project {
    title;
    date;
    size;
    id;
    description;
    thumbnailURL;
    constructor(thumbnailURL, title, date, size, id) {
        this.title = title;
        this.date = date;
        this.size = size;
        this.id = id;
        this.thumbnailURL = thumbnailURL;
    }

    addDescription(description) {
        this.description = description;
    }
};

//const project_sampleProject = new project("Hey myko!!", "This is a sample project", "Thanks for inspiring me to do this :) <3");
const project_WeatherWebApp = new project(constructionImg, "Weather Web app", "May 2021", "Medium", 1);
const project_Unity3dAdventure = new project(constructionImg, "Unity 3d Turn-Based adventure game","May 2021","Medium", 2);
const project_AgileCourseDatabase = new project(constructionImg, "Agile Course Mapping", "Fall 2020", "Large", 3);

var projects = [project_WeatherWebApp,project_AgileCourseDatabase, project_Unity3dAdventure];

// make projects class
// TODO:
// - need to make it so that this has key element, because multiple
class ProjectCard extends React.Component {
    render () {
        return(
                <div class="col-md-6" key={this.props.id}>
                    <div id="bannerPadding">
                        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" id="projectCard">
                            <div class="col p-4 d-flex flex-column position-static">
                                <strong class="d-inline-block mb-2 text-primary">World</strong>
                                    <h3 class="mb-0">{this.props.title}</h3>
                                    <div class="mb-1 text-muted">{this.props.date}</div>
                                        <p class="card-text mb-auto">{this.props.size}</p>
                                        <ProjectButton />
                                    </div>
                                <div class="col-auto d-none d-lg-block">
                                    <img src={this.props.imgSrc} alt="" height="350" width="350"/>
                                </div>
                        </div>
                    </div>
                </div>
        );
    }
}




class CardSpace extends React.Component {

    outputProjects (projList) {
        return projList.map((proj1) =>
            <ProjectCard imgSrc={proj1.thumbnailURL} title={proj1.title} date={proj1.date} size={proj1.size} key={proj1.id}/>
        );
    }

    
    
    render() {
        return (
            <div class="h-100 p-5 bg-light border rounded-3" id="CardSpace">
                <h1>Projects: <br></br></h1>
                <div class="row mb-2">
                    {this.outputProjects(projects)}
                </div>
            </div>   
        );
    }
}


class ProjectButton extends React.Component {
  state = {
    seen: false
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  render() {
    return (
      <div>
        <div className="btn" onClick={this.togglePop}>
          <button>New User?</button>
        </div>
        {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
      </div>
    );
  }
}


export default CardSpace;