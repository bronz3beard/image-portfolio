import React, { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { getAll, getAllImages } from "./Contentful-Fetch/fetchData";

//Components
import InfiniteScroll from "./Components/infinite-scroll";
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
      image: [],

      isOpen: false,
      url: "",
      copy: "",

      layout: false,
    };
  }
  componentDidMount() {
    const currentUrl = "/";
    window.addEventListener("popstate", this.handleClick, false);
    //window.addEventListener("scroll", this.handleScroll, false);

    if (currentUrl) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', currentUrl);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.handleClick, false);
    //window.removeEventListener("scroll", this.handleScroll, false);
  }
  componentWillMount() {
    // Loads some data on initial load
    this.getAllContentfulData();
    this.getAllContentfulImages();    
  }
  getAllContentfulData = () => {
    //const galleryUrl = this.getUrl();
    getAll().then((galleries) => {
      const galleryData = galleries && galleries.find(item => item.fields.url === "/");
      if (!galleryData || galleryData === "undefined") {
        this.setState({
          isLoading: true,
          error: true,
        });
      } else {
        this.setState({
          data: galleryData,
          isLoading: true,
        });
      }
    });
  }
  getAllContentfulImages = () => {
    const { image, startRequest, requestCount } = this.state;
    getAllImages(startRequest, requestCount).then((images) => {
      const allImages = images;
      if (!allImages) {
        this.setState({
          isLoading: false,
          error: true,
        });
      }
      this.setState({
        startRequest: startRequest + requestCount,
        image: [ ...image, ...allImages ],
        hasMore: (images.length >= startRequest),
        isLoading: false,
      });
    });
  }
  /*getUrl = () => {
    const currentURL = window.location.pathname.split('/')[1];
    console.log("TCL: App -> getUrl -> currentURL", currentURL)
    return `/${currentURL}`;
  }*/
  
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
    const { error, hasMore, isLoading, data, image,
      url, copy, isOpen, layout, idTag,
    } = this.state;

    if (error) {
      return (
        <div className="error">
          <span>
            Content data has been fetched but it is empty or the url is undefined.
          </span>
        </div>
      );
    }
    
    const landingImage = data && data.fields.landingImage.fields.file.url;
    return (
      <Switch>
        <Route exact path="/" render={props => (<Landing {...props} landingImage={landingImage} />)} />
        <Route
          path="/gallery"
          render={props => (
            <InfiniteScroll error={error} hasMore={hasMore} isLoading={isLoading} getAllContentfulImages={this.getAllContentfulImages}>
              <Gallery
                {...props}
                data={image}
                url={url}
                copy={copy}
                isOpen={isOpen}
                layout={layout}
                idTag={idTag}
                handleCssChange={this.handleCssChange}
                showModal={this.showModal}
                closeModal={this.closeModal}
              />
            </InfiniteScroll>)}
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