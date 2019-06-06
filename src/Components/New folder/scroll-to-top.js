import React, { PureComponent } from "react";

class ScrollButton extends PureComponent {
  render() {
    const { scrollToTop } = this.props;
    return (
    <footer>
        <button title="Back to top" onClick={scrollToTop}>Back to top</button>
    </footer>
    );
  }
}

export default ScrollButton;