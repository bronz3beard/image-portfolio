import React, { PureComponent } from "react";

class ContextMenu extends PureComponent {
    state = {
        links: [
            {
                id: 0,
                title: "SHARE FB",
                url: "https://www.facebook.com/sharer",
                class: "fb-xfbml-parse-ignore",
                target: "_blank",
                rel: "noopener noreferrer",
            }, {
                id: 1,
                title: "TWEET #Images",
                url: "https://twitter.com/intent/tweet?button_hashtag=tweet&ref_src=twsrc%5Etfw",
                class: "twitter-hashtag-button",
                target: "_blank",
                rel: "noopener noreferrer",
            }, {
                id: 2,
                title: "FOLLOW @roryfn",
                url: "https://twitter.com/roryfn?ref_src=twsrc%5Etfw",
                class: "twitter-follow-button",
                target: "_blank",
                rel: "noopener noreferrer",
            }, {
                id: 3,
                title: "TWEET me @roryfn",
                url: "https://twitter.com/intent/tweet?screen_name=roryfn&ref_src=twsrc%5Etfw",
                class: "twitter-mention-button",
                target: "_blank",
                rel: "noopener noreferrer",
            }, {
                id: 4,
                title: "SHARE ON diaspora*",
                url: "https://share.diasporafoundation.org/?title=diaspora*AdvancedSharer&url=https://share.diasporafoundation.org/",
                class: "",
                target: "_blank",
                rel: "noopener noreferrer",
            }, {
                id: 5,
                title: "Contact",
                url: "/gallery/contact",
                class: "",
                target: "_blank",
                rel: "noopener noreferrer",
            },
        ],
        visible: false,
    };
    componentDidMount() {
        document.addEventListener('contextmenu', this.handleContextMenu);
        document.addEventListener('click', this._handleMouseAction);
        document.addEventListener('scroll', this._handleMouseAction);
    };
    componentWillUnmount() {
        document.removeEventListener('contextmenu', this.handleContextMenu);
        document.removeEventListener('click', this._handleMouseAction);
        document.removeEventListener('scroll', this._handleMouseAction);
    }
    handleContextMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ visible: true });

        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;

        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;

        if (right) {
            this.root.style.left = `${clickX + 5}px`;
        }
        if (left) {
            this.root.style.left = `${clickX - rootW - 5}px`;
        }
        if (top) {
            this.root.style.top = `${clickY + 5}px`;
        }
        if (bottom) {
            this.root.style.top = `${clickY - rootH - 5}px`;
        }
    };
    _handleMouseAction = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);

        if (visible) {
            this.setState({
                visible: false,
            });
        }
        if (wasOutside && visible) {
            this.setState({
                visible: false,
            });
        }
    };

    render() {
        const { visible, links } = this.state;

        return (
            (visible || null) &&
            <div ref={ref => { this.root = ref }} className="contextMenu">
                {
                    links.map((item) => {
                        return (
                            <div className="option" key={item.id}>
                                <a href={item.url} className={item.class} target={item.target} rel={item.rel}>
                                    {item.title}
                                </a>
                            </div>
                        );
                    })
                }
            </div>
        );
    };
}

export default ContextMenu;