import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

class Modal extends PureComponent {
    render() {
        return (
            <div className="modal-overlay" onClick={this.props.onClick} name={this.props.name}>
                <div className="modal-body">
                    <Link to="/modal" className="modal-close" onClick={this.props.onClick} />
                    <img
                        alt=""
                        src={this.props.src}
                        onMouseDown={(event) => event.preventDefault()}
                        draggable="false"
                    />
                        <p key={this.props.imageId}>{this.props.alt}</p>             
                </div>
            </div>
        )
    }
}

export default Modal;