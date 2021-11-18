import React from 'react'


const bigHeader = 
  <h1>Welcome to Walter's portfolio!</h1>
;

class NavBar extends React.Component {
    render() {
        return (
            <div>
                {bigHeader}
                NavBar
            </div>
        );
    }
}

export default NavBar;