import React, { PureComponent, Fragment } from "react";

//Components

class GalleryImage extends PureComponent {
    render() {
        const { src, alt, id, className, style, onClick } = this.props;
        return (
            <Fragment>
                <img
                    id={id}
                    className={className}
                    style={style}
                    onMouseDown={(event) => event.preventDefault()}
                    draggable="false"
                    src={src}
                    alt={alt}
                    onClick={onClick}
                />
            </Fragment>
        );
    }
}

export default GalleryImage;