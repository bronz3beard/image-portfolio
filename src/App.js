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
      currentPage: 0,
      recordsPerPage: 1,
      isOpen: false,
      url: "",
      copy: "",
      theme: "",
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
  showModal = (url, copy, theme, index, event) => {
    event.preventDefault();

    document.body.style.overflow = "hidden";
    document.body.style.overflow = "touch";
    this.setState({
      url,
      copy,
      theme,
      currentPage: index,
      overflow: true,
      isOpen: true,
    });
  }
  handlePageChange = (images, event) => {
    event.preventDefault();
    const type = event.target.textContent;

    //Left mouse click event
    if (type === "〉〉") {
      if (this.state.currentPage === images.length - 1) {
        return;
      }
      this.setState({
        currentPage: this.state.currentPage + 1,
        url: `${images[(this.state.currentPage + 1) % images.length].fields.image.fields.file.url}?fm=jpg&fl=progressive`,
      });
    } if (type === "〈〈") {
      if (this.state.currentPage === images.length % images.length) {
        return;
      }
      this.setState({
        currentPage: this.state.currentPage - 1,
        url: `${images[(this.state.currentPage - 1) % images.length].fields.image.fields.file.url}?fm=jpg&fl=progressive`,
      });
    }
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
    const { error, isLoading, data, url, copy, theme, isOpen, currentPage, imagePerPage, layout } = this.state;

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
    const indexOfLastImage = currentPage * imagePerPage;
    const indexOfFirstImage = indexOfLastImage - imagePerPage;

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
            theme={theme}
            isOpen={isOpen}
            layout={layout}
            currentPage={currentPage}
            imagePerPage={imagePerPage}
            indexOfFirstImage={indexOfFirstImage}
            indexOfLastImage={indexOfLastImage}
            handleCssChange={this.handleCssChange}
            showModal={this.showModal}
            closeModal={this.closeModal}
            handlePageChange={this.handlePageChange}
          />
          <Route component={NoMatch} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;