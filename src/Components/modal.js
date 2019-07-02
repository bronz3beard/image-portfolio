import React, { PureComponent } from "react";

class Modal extends PureComponent {
    
    render() {
        const { images, onClick, toggleNext, togglePrev } = this.props;
//onClick={onClick}                        <button className="TEST" onClick={togglePrev}>Previous</button>

        console.log("TCL: Modal -> render -> images", images)
        return (
                <div className="modal-overlay" >
                    <div className="modal-body">
                        <div className="modal-close" onClick={onClick} />
                        <button className="TEST" onClick={togglePrev}>Previous</button>
                        <button className="TEST" onClick={toggleNext}>Next</button>
                        <img src={`${images.fields.image.fields.file.url}?fm=jpg&fl=progressive`} copy={images.fields.copy} alt="" onMouseDown={(event) => event.preventDefault()} draggable="false" />
                    </div>
                </div>
        )
    }
}

export default Modal;