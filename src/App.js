import React, { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";

//Components
import Gallery from "./Components/gallery";
import Landing from "./Components/landing";
import NoMatch from "./Components/no-match-page";

class App extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Landing />
        <Switch>
          <Route path="/gallery" component={Gallery} />
          <Route component={NoMatch} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;