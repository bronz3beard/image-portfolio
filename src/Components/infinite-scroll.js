import React, { PureComponent } from "react";

class InfiniteScroll extends PureComponent {
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll, false);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll, false);
    }
    handleScroll = () => {
        const { error, isLoading, hasMore, getAllContentfulImages } = this.props;
        const scrolling = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (error || isLoading || !hasMore) return;
        if (scrolling && hasMore) {
            getAllContentfulImages();
        }
    }
    render() {
        const { children } = this.props;
        return (
            <div id="infinite-scroll">
                {children}
            </div>
        )

    }
}

export default InfiniteScroll;