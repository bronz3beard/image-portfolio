import React, { PureComponent, Fragment } from "react";

//Components

class Galleryimages extends PureComponent {
    render() {
        const { images, layout, showModal, parentTheme } = this.props;

        return (
            <Fragment>
                {
                    images && images.map((image) => {
                        const img = `${image.fields.image.fields.file.url}?fm=jpg&fl=progressive`
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