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

        const parentClassChange =  layout === 3 ? "mosaic" : "container-fluid galleryContainer";

        return (
            <Fragment>
                <NavBar data={data.fields} />
                <div className={parentClassChange} id="photos">
                    {
                        data.map(image => {
                            const img = layout === 3 ? `${image.fields.image.fields.file.url}?w=420&h=400&fl=progressive` : image.fields.image.fields.file.url;
                            const text = image.fields.copy;               
                            return (
                                <Suspense key={image.sys.id} fallback={<Preloader />}>
                                    <GalleryImage
                                        className={layout !== 3 ? layout : image.fields.theme}
                                        id={idTag}
                                        src={img}
                                        alt={image.fields.altText}
                                        onClick={(event) => this.showModal(img, text, event)}
                                    />
                                </Suspense>
                            );
                        })
                    }
                    {isOpen ? <Suspense fallback={<Preloader />}><Modal src={`${url}?w=900&h=600&fl=progressive`} onClick={this.closeModal} copy={copy} /></Suspense> : null}

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