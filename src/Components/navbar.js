import React, { PureComponent } from "react";

class NavBar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            location: [
                {
                    id: 0,
                    title: 'Contact',
                    link: "/home/contact/",
                    class: 'contact',
                    icon: true,
                }, {
                    id: 1,
                    title: 'Gallery',
                    link: "/home/gallery/",
                    class: 'gallery',
                    icon: false,
                }, {
                    id: 2,
                    title: 'Home',
                    link: "/home/index/",
                    class: 'home',
                    icon: false,
                }, {
                    id: 3,
                    title: 'Canvas',
                    link: "/home/canvas/",
                    class: 'canvas',
                    icon: false,
                },

            ],
            visable: false,
            Class: "navi",
        }
    }
    handleMenuClick = () => {
        const { visable } = this.state;
        this.setState({
            visable: !visable,
            Class: "naviAfter",
        });
        console.log(visable);
    }
    mouseLeave = () => {
        const { visable } = this.state;
        this.setState({
            visable: false,
            Class: "navi",
        });
        console.log(visable);
    }
    render() {
        const { visable, location, Class } = this.state;

        const items = 
            <ul className="Ulist" onMouseLeave={() => this.mouseLeave()}>
                {
                location.map(page => {
                    return (
                        <li className="listItem" key={page.id}>
                            <Link className="alpha" to={page.link}>
                                <span className={page.class}>
                                    {page.title}
                                </span>
                            </Link>
                        </li>
                        );
                    })
                }
            </ul>
        const routes = 
            <div>
                <Route exact path="/landing" component={App} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/topics" component={Topics} />
            </div>
        
        return (
            <div className={Class} onClick={() => this.handleMenuClick()}>
                {visable === true ? items && routes : null}
            </div>
        );
    }
}

export default NavBar;


