import React, { PureComponent, Fragment, lazy, Suspense } from "react";

//Components
import NavBar from "./navbar";
import Preloader from "./preloader";
import Footer from "./footer";
//Icons
import icon from "../Icons/puzzle.png";
//Styles
import "../Styles/navi.css";
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
  //The modern version of the Fisher–Yates shuffle
  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  handleCssChange = () => {
    this.props.handleCssChange();
  }
  closeModal = () => {
    this.props.closeModal();
  }
  render() {
    const { width } = this.state;
    const { isLoading, data, url, theme, currentPage, imagePerPage, isOpen, layout, showModal, handlePageChange } = this.props;

    const parentClassChange = layout ? "mosaic" : "container-fluid galleryContainer";

    return (
      <Fragment>
        <NavBar />
        <div className={parentClassChange} id="photos">
          {
            data.map(image => {
              return (
                <Suspense key={image.sys.id} fallback={<Preloader />}>
                  {width > 850 && isOpen ? <Suspense fallback={<Preloader />}>
                    <Modal 
                      url={url} 
                      images={image.fields.images} 
                      theme={theme} 
                      currentPage={currentPage} 
                      recordsPerPage={imagePerPage} 
                      onClick={this.closeModal} 
                      handlePageChange={handlePageChange}
                    />
                  </Suspense> : null}
                  <GalleryImage images={image.fields.images} layout={layout} showModal={showModal} parentTheme={image.fields.theme + "-"} />
                </Suspense>
              );
            })
          }
          {width > 850 ? <img src={icon} alt="icons8.com" className="layout-change-icon" onClick={this.handleCssChange} /> : null}
          {isLoading && <Preloader />}
        </div>
        <Footer />
      </Fragment>
    )
  }
}

export default Gallery;