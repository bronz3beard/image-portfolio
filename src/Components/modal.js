import React, { PureComponent } from "react";

class Modal extends PureComponent {
    render() {
        const { src, alt, onClick } = this.props;

        return (
                <div className="modal-overlay" onClick={onClick}>
                    <div className="modal-body">
                        <div className="modal-close" onClick={onClick} />
                        <img src={src} alt={alt} onMouseDown={(event) => event.preventDefault()} draggable="false" />
                    </div>
                </div>
        )
    }
}

export default Modal;