import React, { PureComponent, Fragment } from "react";
import { Route } from "react-router-dom";

//Components
import Gallery from "./gallery";
import InfiniteScroll from "./infinite-scroll";

class MainRoutes extends PureComponent {
    render() {
        const { error, isLoading, data, url, copy, hasMore, isOpen, layout,
            handleCssChange, showModal, closeModal, getAllContentfulImages,
        } = this.props;

        const galleryPageRoutes = data.map(items => {
            return (
                <Route
                    path={items.fields.url}
                    key={items.sys.id}
                    render={props => (
                    <InfiniteScroll error={error} hasMore={hasMore} isLoading={isLoading} getAllContentfulImages={getAllContentfulImages}>
                        <Gallery
                            {...props}
                            data={items.fields.pageBuild}
                            url={url}
                            copy={copy}
                            hasMore={hasMore}
                            isOpen={isOpen}
                            layout={layout}
                            handleCssChange={handleCssChange}
                            showModal={showModal}
                            closeModal={closeModal}
                            getAllContentfulImages={getAllContentfulImages}
                        />
                    </InfiniteScroll>)}
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