import React, { PureComponent } from "react";

//Components
import GalleryImage from "./gallery-image";

class Modal extends PureComponent {
    render() {
        const {src, alt, imageId, onClick} = this.props;

        return (
            <div className="modal-overlay" onClick={onClick}>
                <div className="modal-body">
                    <div className="modal-close" onClick={onClick} />
                    <GalleryImage src={src} alt="" />
                    <p key={imageId}>{alt}</p>
                </div>
            </div>
        )
    }
}

export default Modal;