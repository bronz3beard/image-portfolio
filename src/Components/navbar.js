import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
class NavBar extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="header">
                    <span>Gallery</span>
                </div>
                <ul className="nav">
                    <li><Link to="/gallery/animal">Home</Link></li>
                    <li><Link to="/gallery/contact">Contact</Link></li>
                    <li className="dropdown">
                        <Link to="#" className="dropbtn">Galleries</Link>
                        <div className="dropdown-content">
                            <Link to="/gallery/nature">Nature</Link>
                            <Link to="/gallery/urban">Urban</Link>
                            <Link to="#">Link to another page</Link>
                        </div>
                    </li>
                </ul>
            </Fragment>
        );
    }
}

export default NavBar;