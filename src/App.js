import React, { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { getAll } from "./Contentful-Fetch/fetchData";

//Components
import Preloader from "./Components/preloader";
import Landing from "./Components/landing";
import MainRoutes from "./Components/main-routes";
import NoMatch from "./Components/no-match-page";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: false,
      isLoading: true,

      startRequest: 0,
      requestCount: 10,
      data: null,
      image: [],

      isOpen: false,
      url: "",
      copy: "",

      layout: false,
    };
  }
  componentDidMount() {
    const currentUrl = this.getUrl();
    window.addEventListener("popstate", this.handleClick, false);
    //window.addEventListener("scroll", this.handleScroll, false);

    if (currentUrl) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', currentUrl);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.handleCssChange, false);
    //window.removeEventListener("scroll", this.handleScroll, false);
  }
  componentWillMount() {
    // Loads some data on initial load
    this.getAllContentfulData();
  }
  getAllContentfulData = () => {
    const galleryUrl = this.getUrl();
    getAll().then((galleries) => {
      const galleryData = galleries.find(item => item.fields.url === galleryUrl);
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
    const { error, hasMore, isLoading, data,
      url, copy, isOpen, layout
    } = this.state;
    
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
    const landingImage = data && data.fields.landingImage.fields.file.url;

    return (
      <Switch>
        <Route exact path={data.fields.url} render={props => (<Landing {...props} landingImage={landingImage} data={data.fields} />)} />
        <MainRoutes
          error={error}
          isLoading={isLoading}
          data={data.fields.pageAssembly}
          url={url}
          copy={copy}
          hasMore={hasMore}
          isOpen={isOpen}
          layout={layout}
          handleCssChange={this.handleCssChange}
          showModal={this.showModal}
          closeModal={this.closeModal}
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