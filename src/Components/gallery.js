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
    showModal = (image, copy, event) => {
        this.props.showModal(image, copy, event);
    }
    closeModal = () => {
        this.props.closeModal();
    }
    render() {
        const { hasMore, isLoading, data, url, copy, isOpen, layout } = this.props;

        const parentClassChange =  layout ? "mosaic" : "container-fluid galleryContainer";

        return (
            <Fragment>
                <NavBar data={data.fields} />
                <div className={parentClassChange} id="photos">
                    {
                        data.map(image => {
                            const img = `${image.fields.image.fields.file.url}?fl=progressive`;
                            const text = image.fields.copy;               
                            return (
                                <Suspense key={image.sys.id} fallback={<Preloader />}>
                                    <GalleryImage
                                        className={layout ? image.fields.theme : "wide-screen"}
                                        id={layout ? "" : "wide-screen"}
                                        src={img}
                                        alt={image.fields.altText}
                                        onClick={(event) => this.showModal(img, text, event)}
                                    />
                                </Suspense>
                            );
                        })
                    }
                    {isOpen ? <Suspense fallback={<Preloader />}><Modal src={url} onClick={this.closeModal} copy={copy} /></Suspense> : null}

                    <img src={icon} alt="icons8.com" className="layout-change-icon" onClick={this.handleCssChange} />
                    {isLoading && <Preloader />}
                </div>
                <footer>
                    {!hasMore && <ScrollButton />}
                    <p>
                        &copy; Copyright message goes Here
                    </p>
                </footer>
            </Fragment>
        )
    }
}

export default Gallery;