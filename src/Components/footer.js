import React, { PureComponent } from "react";

//Components
import ScrollButton from "./scroll-to-top";

class Footer extends PureComponent {
    render() {
        return (
            <footer>
                <ScrollButton />
                <p>
                    &copy; Copyright message goes Here
                </p>
            </footer>
        );
    }
}

export default Footer;