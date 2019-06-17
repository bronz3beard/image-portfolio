import React, { PureComponent, Fragment } from "react";

//Components
import NavBar from "./navbar";
import Preloader from "./preloader";
import GalleryImage from "./gallery-image";
import Modal from "./modal";
import ScrollButton from "./scroll-to-top";

//Icons
import icon from "../Icons/puzzle.png";

class Gallery extends PureComponent {
    handleScroll = () => {
        this.props.handleScroll();
    }
    handleCssChange = () => {
        this.props.handleCssChange();
    }
    getScrollLocation = () => {
        this.props.getScrollLocation();
    }
    showModal = (image, event) => {
        this.props.showModal(image, event);
    }
    closeModal = () => {
        this.props.closeModal();
    }

    render() {
        const { hasMore, isLoading, data,
            url, isOpen, layout, idTag
        } = this.props;

        return (
            <Fragment>
                <NavBar data={data.fields} />
                <div className="container-fluid galleryContainer" id="photos">
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
                                                            console.log("TCL: Gallery -> render -> image", image)
                                                            return (
                                                                <GalleryImage
                                                                    key={image.sys.id}
                                                                    className={layout}
                                                                    id={idTag}
                                                                    src={image.fields.image.fields.file.url}
                                                                    alt={image.fields.altText}
                                                                    onClick={(event) => this.showModal(image.fields.image.fields.file.url, event)}
                                                                />
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
                    {isLoading && <Preloader />}
                    {!hasMore && <ScrollButton />}
                    {isOpen ? <Modal src={`${url}?w=900&h=600`} alt={url} onClick={this.closeModal} /> : null}

                    <img src={icon} alt="icons8.com" className="layout-change-icon" onClick={this.handleCssChange} />

                    <div className="footer">
                        <footer>
                            <p>
                                &copy; Copyright message goes Here
                            </p>
                        </footer>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Gallery;