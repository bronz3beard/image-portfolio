import React, { PureComponent } from "react";

//Components
//import Gallery from "./gallery";

class GalleryImage extends PureComponent {
    render() {
        return (
            <img
                id={this.props.id}
                className={this.props.className}
                style={this.props.style}
                onMouseDown={(event) => event.preventDefault()}
                draggable="false"
                src={this.props.src}
                alt={this.props.alt}
                onClick={this.props.onClick} 
            /> 
        );
    }
}

export default GalleryImage;