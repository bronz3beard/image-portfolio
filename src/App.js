import React, { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";

//Components
import Gallery from "./Components/gallery";
import Landing from "./Components/landing";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Urls: [],
      url: "",
      text: "",

      isOpen: false,
      isLoading: true,
      error: false,
      pageChange: false,

      Class: 0,
      idTag: 0,
    }
  }
  componentDidMount() {
    const agendaUrl = this.getUrl();
    console.log("TCL: Gallery -> componentDidMount -> agendaUrl", agendaUrl)
    window.addEventListener("popstate", this.handleClick);

    this.loadRecordsFromServer();

    if (agendaUrl) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', agendaUrl);
    }
  }
  // Initial call to the server for records 
  loadRecordsFromServer() {
    const xmlhr = new XMLHttpRequest();
    const url = "https://jsonplaceholder.typicode.com/photos";
    xmlhr.open("GET", url, true);
    xmlhr.onload = () => {
      if (xmlhr.readyState === xmlhr.DONE) {
        if (xmlhr.status === 200) {
          const data = JSON.parse(xmlhr.responseText);
          console.log("TCL: Gallery -> xmlhr.onload -> data", data)
          this.setState({
            Urls: data,
            isLoading: false,
          });
        } else {
          this.setState({
            error: true,
          });
        }
      }
    };
    xmlhr.send();
  }
  getUrl = () => {
    const currentURL = window.location.pathname.split('/')[0];
    console.log("TCL: App -> getUrl -> currentURL", currentURL)
    return `/${currentURL}`;
  }
  showModal = (image, paragraph, event) => {
    event.preventDefault();
    document.body.style.overflow = "hidden"
    document.body.style.overflow = "touch"
    this.setState({
      overflow: true,
      isOpen: true,
      url: image,
      text: paragraph,
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
  handleClick = () => {
    const { pageChange } = this.state;
    this.setState({ pageChange: !pageChange });
  }
  handleCssChange = () => {
    const { Class } = this.state;

    const rand = [1, 2, 3, 4, 5, 6, 7, 8];
    var randomNumber = (Class + 1) % rand.length;

    this.setState({
      Class: randomNumber,
      idTag: randomNumber,
    });
    //console.log(randomNumber);
  }
  render() {
    const { Urls, url, text, isOpen, isLoading, 
      error, pageChange, Class, idTag
    } = this.state;
    
    return (
      <React.Fragment>
        <Landing pageChange={pageChange} handleClick={this.handleClick}/>
        <Switch>
          <Route
            path="/gallery"
            render={props => (
              <Gallery
                {...props}
                Urls={Urls}
                isLoading={isLoading}
                error={error}
                isOpen={isOpen}
                Class={Class}
                idTag={idTag}
                url={url}
                text={text}
                showModal={this.showModal} 
                closeModal={this.closeModal}
                handleCssChange={this.handleCssChange}
              />
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;