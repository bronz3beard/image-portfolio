import React, { PureComponent } from "react";

//Components
import GalleryImage from "./gallery-image";
import Modal from "./modal";
import Preloader from "./preloader";

//let number = 200; //Math.floor((Math.random() * 100) + 100);
//let className = Math.floor(Math.random() * 0) + 7;

class Gallery extends PureComponent {   
    render() {
        const { Urls, isLoading, error, isOpen, Class, 
            idTag, url, text, showModal, closeModal, handleCssChange
        } = this.props;
        const icon = require("../Icons/index.png")

        if (isLoading) {
            return (
                <Preloader />
            );
        }
        if (error) {
            return (
                <div className="error">
                    <span>
                        images have not been fetched.
                    </span>
                </div>
            );
        }
        return (
            <div
                refs="galleryContainer"
                className="container-fluid galleryContainer"
                id="photos">
                {
                    Urls.map(content => {
                        return (
                            <GalleryImage
                                key={content.id}
                                className={Class}
                                id={idTag}
                                src={content.url}
                                alt={content.title}
                                onClick={(event) => showModal(content.thumbnailUrl, event)}       
                            />
                        );
                    })
                }
                {isOpen ? <Modal onClick={closeModal} src={url} alt={text} /> : null}
                <img src={icon} alt="icons8.com" className="layout" onClick={handleCssChange} />
                <div className="footer">
                    <footer>
                        <p>
                            &copy; Message goes Here
                        </p>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Gallery;