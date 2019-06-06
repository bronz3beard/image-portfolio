import React, { PureComponent } from "react";

class ContextMenu extends PureComponent {
    state = {
        Links: [],
        visible: false,
    };
    
    componentDidMount() {
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
      document.removeEventListener('contextmenu', this._handleContextMenu);
      document.removeEventListener('click', this._handleClick);
      document.removeEventListener('scroll', this._handleScroll);
    }
    
    _handleContextMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        this.setState({ visible: true });
        //const width = this.root.clientWidth;
        //const height = this.root.clientHeight;

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
         console.log(Math.floor(clickX), Math.floor(clickY));
    };

    _handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
        
        if (wasOutside && visible) {
            this.setState({
                visible: false,
            });
        }
    };

    _handleScroll = () => {
        const { visible } = this.state;
        
        if (visible) {
            this.setState({
                visible: false,
            });
        }
    };
    
    render() {
        const { visible } = this.state;
        
        return(visible || null) && 
            <div ref={ref => { this.root = ref }} className="contextMenu">
            <div className="fb-share-button" data-href="https://portfolioreact.azurewebsites.net/home/gallery/" data-layout="button" data-size="small" data-mobile-iframe="true">
                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flocalhost%3A44322%2FHome%2FIndex%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">SHARE FB</a>
            </div>
            
            <div className="contextMenu--option"><a href="https://twitter.com/intent/tweet?button_hashtag=tweet&ref_src=twsrc%5Etfw" className="twitter-hashtag-button" data-show-count="false">TWEET #Images</a></div>
            <div className="contextMenu--option"><a href="https://twitter.com/roryfn?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="false">FOLLOW @roryfn</a></div>
            <div className="contextMenu--option contextMenu--option__disabled"><a href="https://twitter.com/intent/tweet?screen_name=roryfn&ref_src=twsrc%5Etfw" className="twitter-mention-button" data-show-count="false">TWEET me @roryfn</a></div>
            <div className="contextMenu--option">
                <a href="https://share.diasporafoundation.org/?title=diaspora* Advanced Sharer&url=https://share.diasporafoundation.org/" rel="nofollow" target="_blank">
                    SHARE ON diaspora*
                    </a>
            </div>
                <div className="contextMenu--separator" />
            <div className="contextMenu--option"><a href="/Home/Contact/">Contact</a></div>
            </div>
    };
}

export default ContextMenu;