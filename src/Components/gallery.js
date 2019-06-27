import React, { PureComponent, Fragment, lazy, Suspense } from "react";

//Components
import NavBar from "./navbar";
import Preloader from "./preloader";
import ScrollButton from "./scroll-to-top";

//Icons
import icon from "../Icons/puzzle.png";

//Lazy load Components
const GalleryImage = lazy(() => import("./gallery-image"));
const Modal = lazy(() => import("./modal"));

class Gallery extends PureComponent {
  state = {
    width: window.innerWidth,
  };
  componentDidMount() {
    window.addEventListener("resize", this.resizeWindow);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeWindow);
  }
  resizeWindow = () => {
    this.setState({
      width: window.innerWidth,
    });
    //console.log(window.innerWidth);
  }
  handleCssChange = () => {
    this.props.handleCssChange();
  }
  closeModal = () => {
    this.props.closeModal();
  }
  //
  render() {
    const { width } = this.state;
    const { isLoading, data, url, copy, isOpen, layout, showModal } = this.props;
    console.log("TCL: Gallery -> render -> data", data)

    const parentClassChange = layout ? "mosaic" : "container-fluid galleryContainer";

    return (
      <Fragment>
        <NavBar />
        <div className={parentClassChange} id="photos">
          {
            data.map(image => {
              return (
                  <Suspense key={image.sys.id} fallback={<Preloader />}>
                      <GalleryImage images={image.fields.images} layout={layout} showModal={showModal} parentTheme={image.fields.theme + "-"} />
                  </Suspense>
              );
            })
          }
          {isOpen ? <Suspense fallback={<Preloader />}><Modal src={url} copy={copy} onClick={this.closeModal} /></Suspense> : null}

          {width > 667 ? <img src={icon} alt="icons8.com" className="layout-change-icon" onClick={this.handleCssChange} /> : null}
          {isLoading && <Preloader />}
        </div>
        <footer>
          <ScrollButton />
          <p>
            &copy; Copyright message goes Here
          </p>
        </footer>

      </Fragment>
    )
  }
}

export default Gallery;