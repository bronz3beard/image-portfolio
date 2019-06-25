import React, { PureComponent, Fragment } from "react";

//Components

class Galleryimages extends PureComponent {

    render() {
        const { images, layout, showModal } = this.props;

        return (
            <Fragment>
                {
                    images && images.map((image) => {
                        const img = image.fields.image.fields.file.url
                        const copy = image.fields.copy
                        return (
                            <div key={image.sys.id} className={layout ? image.fields.theme : "wide-screen"}>
                                <img
                                    id={layout ? "" : "wide-screen"}
                                    draggable="false"
                                    src={img}
                                    alt={image.fields.altText}
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={(event) => showModal(img, copy, event)}
                                />
                            </div>
                        );
                    })
                }
            </Fragment>
        );
    }
}

export default Galleryimages;