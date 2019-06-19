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
        const { hasMore, isLoading, data, url, copy, isOpen, layout, idTag } = this.props;
        return (
            <Fragment>
                <NavBar data={data.fields} />
                <div className="container-fluid galleryContainer" id="photos">
                    {
                        data.map(image => {
                            return (
                                <Suspense key={image.sys.id} fallback={<Preloader />}>
                                    <GalleryImage
                                        className={layout}
                                        id={idTag}
                                        src={image.fields.image.fields.file.url}
                                        alt={image.fields.altText}
                                        onClick={(event) => this.showModal(image.fields.image.fields.file.url, image.fields.copy, event)}
                                    />
                                </Suspense>
                            );
                        })
                    }
                    {isOpen ? <Suspense fallback={<Preloader />}><Modal src={`${url}?w=900&h=600`} onClick={this.closeModal} copy={copy} /></Suspense> : null}

                    <img src={icon} alt="icons8.com" className="layout-change-icon" onClick={this.handleCssChange} />
                    {isLoading && <Preloader />}
                    <footer>
                        {!hasMore && <ScrollButton />}
                        <p>
                            &copy; Copyright message goes Here
                        </p>
                    </footer>
                </div>
            </Fragment>
        )
    }
}

export default Gallery;