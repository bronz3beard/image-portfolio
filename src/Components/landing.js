import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

//Components

class Landing extends PureComponent {
    state = {
        x: 0,
        y: 0,
    }    
    _onMouseMove = (event) => {
        const width = this.refs.titleContainer.clientWidth;
        const height = this.refs.titleContainer.clientHeight;
        const offX = (event.nativeEvent.layerX / width) * 100;
        const offY = (event.nativeEvent.layerY / height) * 100;

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

        const mStyle = {
            "--maskX": x,
            "--maskY": y,
        }
        
        const bgImage = `${this.props.landingImage}?h=1200&fm=jpg&q=80`;
        const bgimg1 = {
            /* The image used */
            "backgroundImage": `url(${bgImage})`,
            /* Set a specific height */
            "minHeight": 1200 + "px",
            /* Create the parallax scrolling effect */
            "backgroundAttachment": "fixed",
            "backgroundPosition": "center",
            "backgroundRepeat": "no-repeat",
            "backgroundSize": "cover",
        }

        return (
            <div
                className="titleContainer"
                onMouseMove={this._onMouseMove}
                onMouseOut={this._onMouseOut}
                ref="titleContainer"
                style={mStyle}
            >
                <div style={bgimg1}></div>

                <div className="titleWrapper">
                    <div className="caption" id="caption">
                        <span className="border">
                            <Link to="/gallery/animal">GALLERY</Link>
                        </span>
                    </div>
                    <div className="titleWrapper cloneWrapper">
                        <div className="caption">
                            <span className="border">
                                <Link to="/gallery/animal">GALLERY</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;           