import React from 'react';
import logo from './linkedinLogo.png';


// smaller badge components with links to socials
export class LinkedinBadge extends React.Component {
    render() {
        return (
            <a href="https://www.linkedin.com/in/walter-lewis-46163b1b7?trk=profile-badge">
                <img height="50" width="50" src={logo} alt="logo"/>
            </a>    
        );
    }
}

export class gitHubBadge extends React.Component {
    render() {
        return (
            <a href="https://www.linkedin.com/in/walter-lewis-46163b1b7?trk=profile-badge">
                <img height="50" width="50" src={logo} alt="logo"/>
            </a>    
        );
    }
}

// big footer component
export class Footer extends React.Component {
    render() {
        return (
            <div>
                <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div class="col-md-4 d-flex align-items-center">
                            <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                                <svg class="bi" width="30" height="24"><use href="#bootstrap"></use></svg>
                            </a>
                        <span class="text-muted">© 2021 Walter Lewis</span>
                    </div>

                    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li class="ms-3">
                            <div class="text-muted">
                                <LinkedinBadge/>
                            </div>
                        </li>
                    </ul>
                </footer>
            </div>
        );
    }
}