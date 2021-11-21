import React from 'react'


const bigHeader = 
  <h1>Welcome to Walter's portfolio!</h1>
;

class NavBar extends React.Component {
    render() {
        return (
            <div class="h-100 p-5 bg-light border rounded-3">
                <h2>Add borders</h2>
                <p>{bigHeader}</p>
                <button class="btn btn-outline-secondary" type="button">Example button</button>
            </div>
        );
    }
}

export default NavBar;