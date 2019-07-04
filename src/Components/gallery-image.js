import React, { PureComponent, Fragment } from "react";

//Components

class Galleryimages extends PureComponent {
    render() {
        const { images, layout, showModal, parentTheme } = this.props;

        return (
            <Fragment>
                {
                    images && images.map((image, index) => {
                        const url = `${image.fields.image.fields.file.url}?fm=jpg&fl=progressive`
                        const copy = image.fields.copy
                        const theme = image.fields.theme
                        return (
                            <div key={image.sys.id} className={layout ? parentTheme + image.fields.theme : parentTheme + "wide-screen"}>
                                <img
                                    key={index}
                                    id={layout ? "" : parentTheme + "wide-screen"}
                                    draggable="false"
                                    src={url}
                                    alt={image.fields.altText}
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={(event) => showModal(url, copy, theme, index, event)}
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