import React, { PureComponent, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

//Components
import Gallery from "./Components/gallery";
import Landing from "./Components/landing";
import NoMatch from "./Components/no-match-page"; 

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Landing} /> 
          <Route path="/gallery" component={Gallery} />
          <Route component={NoMatch} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;