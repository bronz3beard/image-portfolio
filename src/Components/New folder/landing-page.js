import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

class LandingPage extends PureComponent {
  render() {
    const { data, pageChange, handleClick } = this.props;

    const menuItems = data.map(menuItem => {
      return (
        <Link
          to={menuItem.fields.url}
          className={pageChange ? "menu-item" : "menu-item slide-aside"}
          key={menuItem.sys.id}
          onClick={handleClick}
        >
          {menuItem.fields.header}
          <span className="sub-heading">{menuItem.fields.subHeader}</span>
        </Link>
      );
    });

    return (
      <aside className={pageChange ? "menu" : "menu hide"}>{menuItems}</aside>
    );
  }
}

export default LandingPage;