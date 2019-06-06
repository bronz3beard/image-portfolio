import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class Nav extends PureComponent {
  render() {
    const { data, pageChange, handleClick } = this.props;
    return (
      <nav>
        <h1>{data.title}</h1>
        <Link to={data.url} id="nav-menu" className={pageChange ? "" : "slide-menu"} onClick={handleClick}>
          &nbsp;
        </Link>
      </nav>
    );
  }
}

export default Nav;