import React, { PureComponent, Fragment } from "react";
import { Route } from "react-router-dom";

//Components
import Gallery from "./gallery";

class MainRoutes extends PureComponent {
    render() {
        const { data, url, copy, isOpen, 
            layout, handleCssChange, showModal, closeModal
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
                            isOpen={isOpen}
                            layout={layout}
                            handleCssChange={handleCssChange}
                            showModal={showModal}
                            closeModal={closeModal}
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