import React, { PureComponent } from "react";

//Components
import GalleryImage from "./gallery-image";

class Modal extends PureComponent {
    render() {
        const { src, alt, copy, onClick } = this.props;

        return (
                <div className="modal-overlay" onClick={onClick}>
                    <div className="modal-body">
                        <div className="modal-close" onClick={onClick} />
                        <GalleryImage src={src} alt={alt} onMouseDown={(event) => event.preventDefault()} draggable="false" />
                        <p className="slide-in">{copy}</p>
                    </div>
                </div>
        )
    }
}

export default Modal;