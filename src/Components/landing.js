import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

//Components

class Landing extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            x: 0,
            y: 0,
        }
    }
    _onMouseMove = (event) => {
        const width = this.refs.titleContainer.clientWidth;
        const height = this.refs.titleContainer.clientHeight;
        const offX = (event.nativeEvent.layerX / width) * 100;
        const offY = (event.nativeEvent.layerY / height) * 100;
        console.log(Math.floor(offX), Math.floor(offY));
        this.setState({
            x: offX,
            y: offY,
        });
    }
    _onMouseOut = () => {
        this.setState({
            x: 0,
            y: 0,
        });
    }

    render() {
        const { x, y } = this.state;
        const { pageChange, handleClick } = this.props;
        const mStyle = {
            "--maskX": x,
            "--maskY": y,
        }

        return (
            <div
                className="titleContainer"
                onMouseMove={this._onMouseMove}
                onMouseOut={this._onMouseOut}
                onClick={handleClick}
                ref="titleContainer"
                style={mStyle}
            >
                <div className="bgimg1"></div>
                <div className={pageChange ? "hide" : "titleWrapper"} >
                    <div className="caption" id="caption">
                        <span className="border">
                            <Link to="/gallery">GALLERY</Link>
                        </span>
                    </div>
                    <div className="titleWrapper cloneWrapper">
                        <div className="caption">
                            <span className="border">
                                <Link to="/gallery">GALLERY</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;