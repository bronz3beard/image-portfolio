import React, { PureComponent, Fragment, lazy, Suspense } from "react";

//Components
import NavBar from "./navbar";
import Preloader from "./preloader";
import Footer from "./footer";
//Icons
import icon from "../Icons/puzzle.png";

//Lazy load Components
const GalleryImage = lazy(() => import("./gallery-image"));
const Modal = lazy(() => import("./modal"));

class Gallery extends PureComponent {
  state = {
    selectedIndex: 0,
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
  toggleNext = () => {
    const { selectedIndex } = this.state;
    this.props.data.map((image => {
      console.log("TCL: Gallery -> toggleNext -> selectedIndex === image.fields.images.length", selectedIndex + " -> " +  image.fields.images.length)
      if (selectedIndex === image.fields.images.length) {
        return;
      }
    }));

    this.setState({
      selectedIndex: selectedIndex + 1,
    });  
  }
  togglePrev = () => {
    const { selectedIndex } = this.state;
    if (selectedIndex === 0)
      return;


    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex - 1
    }))
  }
  handleCssChange = () => {
    this.props.handleCssChange();
  }
  closeModal = () => {
    this.props.closeModal();
  }
  render() {
    const { width, selectedIndex } = this.state;
    const { isLoading, data, url, copy, isOpen, layout, showModal, togglePrev } = this.props;

    const parentClassChange = layout ? "mosaic" : "container-fluid galleryContainer";
    console.log(data)
    return (
      <Fragment>
        <NavBar />
        <div className={parentClassChange} id="photos">
          {
            data.map(image => {


              return (
                <Suspense key={image.sys.id} fallback={<Preloader />}>
                  {width > 850 && isOpen ? <Suspense fallback={<Preloader />}>
                    <Modal onClick={this.closeModal} images={image.fields.images[(selectedIndex + 1) % image.fields.images.length]} toggleNext={this.toggleNext} togglePrev={this.togglePrev}/>
                  </Suspense> : null}
                  <GalleryImage images={image.fields.images} layout={layout} showModal={showModal} isOpen={isOpen} selectedIndex={selectedIndex} parentTheme={image.fields.theme + "-"} />
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