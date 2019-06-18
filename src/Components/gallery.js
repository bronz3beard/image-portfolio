import React, { PureComponent, Fragment, lazy, Suspense } from "react";

//Components
import NavBar from "./navbar";
import InfiniteScroll from "./infinite-scroll";
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
        const { hasMore, isLoading, error, data, url, copy, 
            isOpen, layout, idTag, handleScroll, getContentful,
        } = this.props;

        return (
            <Fragment>
                <NavBar data={data.fields} />
                <div className="container-fluid galleryContainer" id="photos">
                    <InfiniteScroll error={error} isLoading={isLoading} hasMore={hasMore} handleScroll={handleScroll} getContentful={getContentful}>
                        {
                            data.map(content => {
                                return (
                                    <Fragment key={content.sys.id}>
                                        {
                                            content.fields.pageBuild.map((img) => {
                                                return (
                                                    <Fragment key={img.sys.id}>
                                                        {
                                                            img.fields.images.map((image) => {
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
                                                    </Fragment>

                                                );
                                            })
                                        }
                                    </Fragment>
                                );
                            })
                        }
                        {!isLoading && <Preloader />}
                        {!hasMore && <ScrollButton />}
                        {isOpen ? <Suspense fallback={<Preloader />}><Modal src={`${url}?w=900&h=600`} onClick={this.closeModal} copy={copy}/></Suspense> : null}

                        <img src={icon} alt="icons8.com" className="layout-change-icon" onClick={this.handleCssChange} />

                        <div className="footer">
                            <footer>
                                <p>
                                    &copy; Copyright message goes Here
                            </p>
                            </footer>
                        </div>
                    </InfiniteScroll>
                </div>
            </Fragment>
        )
    }
}

export default Gallery;