import React, { PureComponent } from "react";

class InfiniteScroll extends PureComponent {
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll, false);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll, false);
    }
    handleScroll = () => {
        const { error, isLoading, hasMore, getContentful } = this.props;
        const scrolling = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight;
        console.log("TCL: InfiniteScroll -> handleScroll -> scrolling", scrolling)

        if (error || isLoading || !hasMore) return;
        if (scrolling) {
            getContentful();
        }
    }
    render() {
        const { children } = this.props;
        return (
            <div>
                {children}
            </div>
        )

    }
}

export default InfiniteScroll;