import React, { PureComponent, Fragment } from "react";
import { Route } from "react-router-dom";

//Components
import Gallery from "./gallery";

class MainRoutes extends PureComponent {                           
    render() {
        const { data, url, copy, theme, isOpen, currentPage, imagePerPage, indexOfFirstImage,
            indexOfLastImage, handlePageChange, layout, handleCssChange, showModal, closeModal
        } = this.props;

        const galleryPageRoutes = data.map(items => {
            return (
                <Route
                    path={items.fields.url}
                    key={items.sys.id}
                    render={props => (
                        <Gallery
                            {...props}
                            data={items.fields.pageBuild}
                            url={url}
                            copy={copy}
                            theme={theme}
                            parentTheme={items.fields.theme}
                            isOpen={isOpen}
                            layout={layout}
                            showModal={showModal}
                            closeModal={closeModal}
                            currentPage={currentPage} 
                            imagePerPage={imagePerPage} 
                            indexOfFirstImage={indexOfFirstImage}
                            indexOfLastImage={indexOfLastImage}
                            handlePageChange={handlePageChange}
                            handleCssChange={handleCssChange}
                        />
                    )}
                />
            );
        })

        return (
            <Fragment>
                {galleryPageRoutes}
            </Fragment>
        );
    }
}
    
export default MainRoutes;