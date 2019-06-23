import React, { PureComponent } from "react";

//Components

class GalleryImage extends PureComponent {
    render() {
        const { src, alt, id, className, onClick } = this.props;

        return (
            <div className={className}>
                <img
                    id={id}
                    draggable="false"
                    src={src}
                    alt={alt}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={onClick}
                />
            </div>
        );
    }
}

export default GalleryImage;