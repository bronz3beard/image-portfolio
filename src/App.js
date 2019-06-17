import React, { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { getAll } from "./Contentful-Fetch/fetchData";

//Components
import Preloader from "./Components/preloader";
import Landing from "./Components/landing";
import Gallery from "./Components/gallery";
import NoMatch from "./Components/no-match-page";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: false,
      isLoading: false,

      startRequest: 0,
      requestCount: 10,
      data: null,

      isOpen: false,
      url: "",

      layout: 0,
      idTag: 0,
    };
  }
  componentDidMount() {
    const currentUrl = "/";
    window.addEventListener("popstate", this.handleClick, false);

    window.addEventListener("scroll", this.handleScroll, false);
    if (currentUrl) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', currentUrl);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, false);
  }
  componentWillMount() {
    // Loads some data on initial load
    this.getContentful();
  }
  getContentful() {
    //const galleryUrl = this.getUrl();

    getAll().then(galleries => {
      const galleryData = galleries && galleries.find(item => item.fields.url === "/");

      if (!galleryData || galleryData === "undefined") {
        this.setState({
          isLoading: false,
          error: true,
        });
      } //else {
      this.setState({
        data: galleryData,
        isLoading: true,
      });
      //}
    });
  }
  /*getUrl = () => {
    const currentURL = window.location.pathname.split('/')[1];
    console.log("TCL: App -> getUrl -> currentURL", currentURL)
    return `/${currentURL}`;
  }*/
  handleScroll = () => {
    const { error, isLoading, hasMore } = this.state;
    const scrolling = this.getScrollLocation();

    if (error || isLoading || !hasMore) return;
    if (scrolling) {
      this.getContentful();
    }
  }
  handleCssChange = () => {
    const { layout } = this.state;

    const lastScrollY = window.scrollY;
    window.scrollTo(0, lastScrollY);

    const rand = [1, 2, 3, 4, 5];
    const randomNumber = (layout + 1) % rand.length;
    this.setState({
      layout: randomNumber,
      idTag: randomNumber,
    });
  }
  getScrollLocation = () => {
    const scrolling = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return scrolling;
  }
  showModal = (image, event) => {
    event.preventDefault();
    document.body.style.overflow = "hidden"
    document.body.style.overflow = "touch"
    this.setState({
      overflow: true,
      isOpen: true,
      url: image,
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
    const { error, hasMore, isLoading, data,
      url, isOpen, layout, idTag
    } = this.state;

    if (!isLoading) {
      return (<Preloader />);
    }
    if (error) {
      return (
        <div className="error">
          <span>
            Content data has been fetched but it is empty or the url is undefined.
          </span>
        </div>
      );
    }
    const landingImage = data.fields.landingImage.fields.file.url;
    return (
      <Switch>
        <Route exact path="/" render={props => (<Landing {...props} landingImage={landingImage} />)} />
        <Route
          path="/gallery"
          render={props => (
            <Gallery
              {...props}
              isLoading={!isLoading}
              data={data.fields.pageAssembly}
              hasMore={hasMore}
              url={url}
              isOpen={isOpen}
              layout={layout}
              idTag={idTag}
              handleScroll={this.handleScroll}
              handleCssChange={this.handleCssChange}
              getScrollLocation={this.getScrollLocation}
              showModal={this.showModal}
              closeModal={this.closeModal}
            />)}
        />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

export default App;

/*loaddata = () => {
  const { data, startRequest, requestCount } = this.state;
  const xmlhr = new XMLHttpRequest();
  const url = `https://jsonplaceholder.typicode.com/photos?_start=${startRequest}&_limit=${requestCount}`;
  this.setState({ isLoading: true });

  xmlhr.open("GET", url, true);
  xmlhr.onload = () => {
      if (xmlhr.readyState === xmlhr.DONE) {
          if (xmlhr.status === 200) {
              const nextdata = JSON.parse(xmlhr.responseText)
              this.setState({
                  startRequest: startRequest + requestCount,
                  data: [...data, ...nextdata],
                  hasMore: (data.length >= startRequest),
                  isLoading: false,
              });
          } else {
              this.setState({
                  error: true,
                  isLoading: false,
              });
          }
      }
  };
  xmlhr.send();
}*/