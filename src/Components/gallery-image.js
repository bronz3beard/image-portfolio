import React, { PureComponent, Fragment } from "react";

//Components

class Galleryimages extends PureComponent {
    //The modern version of the Fisher–Yates shuffle
    shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    render() {
        const { images, layout, showModal, parentTheme } = this.props;

        return (
            <Fragment>
                {
                    images && this.shuffle(images).map((image) => {
                        const img = image.fields.image.fields.file.url
                        const copy = image.fields.copy
                        return (
                            <div key={image.sys.id} className={layout ? parentTheme + image.fields.theme : parentTheme + "wide-screen"}>
                                <img
                                    id={layout ? "" : parentTheme + "wide-screen"}
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