import React, { PureComponent } from "react";

//Components
import Pagination from "./pagination";

class Modal extends PureComponent {

    render() {
        const { images, url, theme, onClick, currentPage, imagePerPage, handlePageChange } = this.props;

        return (
            <div className="modal-overlay" >
                <div className="modal-body">
                    <div className="modal-close" />
                    <Pagination data={images} currentPage={currentPage} imagePerPage={imagePerPage} handlePageChange={handlePageChange}/>
                    <div className="image-container">
                    <img
                        className={theme}
                        src={url}
                        alt=""
                        onClick={onClick}
                        onMouseDown={(event) => event.preventDefault()}
                        draggable="false"
                    /></div>
                </div>
            </div>
        )
    }
}

export default Modal;