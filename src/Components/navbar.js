import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
class NavBar extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="header">
                    <span>Gallery</span>
                </div>
                <ul>
                    <li><Link to="/animal">Home</Link></li>
                    <li><Link to="#">News</Link></li>
                    <li className="dropdown">
                        <Link to="#" className="dropbtn">Stills</Link>
                        <div className="dropdown-content">
                            <Link to="/nature">Nature</Link>
                            <Link to="#">Link 2</Link>
                            <Link to="#">Link 3</Link>
                        </div>
                    </li>
                </ul>
            </Fragment>
        );
    }
}

export default NavBar;