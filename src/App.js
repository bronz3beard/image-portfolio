import React, { PureComponent, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { getAll } from "./Contentful-Fetch/fetchData";

//Components
import Preloader from "./Components/preloader";
import Contact from "./Components/contact-page";
import Landing from "./Components/landing";
import MainRoutes from "./Components/main-routes";
import NoMatch from "./Components/no-match-page";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoading: true,
      data: null,
      isOpen: false,
      url: "",
      copy: "",
      layout: false,
    };
  }
  componentDidMount() {
    const currentUrl = this.getUrl();

    if (currentUrl) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', currentUrl);
    }
  }
  componentWillMount() {
    // Loads some data on initial load
    this.getAllContentfulData();
  }
  getAllContentfulData = () => {
    const galleryUrl = this.getUrl();
    getAll().then((galleries) => {
      const galleryData = galleries && galleries.find(item => item.fields.url === galleryUrl);
      if (!galleryData || galleryData === "undefined") {
        this.setState({
          isLoading: false,
          error: true,
        });
      } else {
        this.setState({
          data: galleryData,
          isLoading: false,
        });
      }
    });
  }
  getUrl = () => {
    const currentURL = window.location.pathname.split('/')[1];
    //console.log("TCL: App -> getUrl -> currentURL", currentURL)
    return `/${currentURL}`;
  }
  handleCssChange = () => {
    const { layout } = this.state;
    const lastScrollY = window.scrollY;
    window.scrollTo(0, lastScrollY);

    this.setState({
      layout: !layout,
    });
  }
  showModal = (image, copy, event) => {
    event.preventDefault();
    document.body.style.overflow = "hidden"
    document.body.style.overflow = "touch"
    this.setState({
      overflow: true,
      isOpen: true,
      url: image,
      copy: copy,
    });
  }
  closeModal = () => {
    document.body.style.overflow = "auto"
    this.setState({
      overflow: false,
      isOpen: false,
      url: "",
    });
  }
  render() {
    const { error, isLoading, data, url, copy, isOpen, layout } = this.state;
    
    if (isLoading) {
      return (
        <Preloader />
      )
    }
    if (error) {
      return (
        <div className="error">
          <span>
            "Content data has been fetched but it is empty or the url is undefined."
          </span>
        </div>
      );
    }
    const landingImage = data.fields.landingImage.fields.file.url;
    
    const contactDetails = data.fields.pageAssembly.find(item => item.fields.url === "/gallery/contact");

    return (
      <Fragment>
        <Switch>
          <Route exact path={data.fields.url} render={props => (<Landing {...props} landingImage={landingImage} data={data.fields} />)} />
          <Route path="/gallery/contact" render={props => (<Contact {...props} data={contactDetails} />)} />
          <MainRoutes
            error={error}
            isLoading={isLoading}
            data={data.fields.pageAssembly}
            url={url}
            copy={copy}
            isOpen={isOpen}
            layout={layout}
            handleCssChange={this.handleCssChange}
            showModal={this.showModal}
            closeModal={this.closeModal}
          />
          <Route component={NoMatch} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;