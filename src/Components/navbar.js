import React, { PureComponent, Fragment } from "react";

class NavBar extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="header">
                    <span>Gallery</span>
                </div>
                <ul>
                <li><a href="#home">Home</a></li>
  <li><a href="#news">News</a></li>
                    <li className="dropdown">
                        <a className="dropbtn">Stills</a>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </li>
                </ul>
            </Fragment>
        );
    }
}

export default NavBar;