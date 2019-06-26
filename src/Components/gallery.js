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
  handleCssChange = () => {
    this.props.handleCssChange();
  }
  closeModal = () => {
    this.props.closeModal();
  }
  render() {
    const { isLoading, data, url, copy, isOpen, layout, showModal } = this.props;

    const parentClassChange = layout ? "mosaic" : "container-fluid galleryContainer";

    return (
      <Fragment>
                                <NavBar />
        <div className={parentClassChange} id="photos">
          {
            data.map(image => {
              return (
                <Suspense key={image.sys.id} fallback={<Preloader />}>
                  <GalleryImage images={image.fields.images} layout={layout} showModal={showModal} />
                </Suspense>
              );
            })
          }
          {isOpen ? <Suspense fallback={<Preloader />}><Modal src={url} copy={copy} onClick={this.closeModal} /></Suspense> : null}

          <img src={icon} alt="icons8.com" className="layout-change-icon" onClick={this.handleCssChange} />
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