import React, { PureComponent } from "react";

//Components
import Preloader from "./preloader";
import NavBar from "./navbar";
import GalleryImage from "./gallery-image";
import Modal from "./modal";
import ScrollButton from "./scroll-to-top";

//Icons
import icon from "../Icons/puzzle.png";

class Gallery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            hasMore: false,
            isLoading: false,

            startRequest: 0,
            requestCount: 10,
            images: [],

            isOpen: false,
            url: "",

            layout: 0,
            idTag: 0,
        };
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll, false);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll, false);
    }
    componentWillMount() {
        // Loads some images on initial load
        this.loadImages();
    }
    //Call to the server for data
    loadImages = () => {
        const { images, startRequest, requestCount } = this.state;
        const xmlhr = new XMLHttpRequest();
        const url = `https://jsonplaceholder.typicode.com/photos?_start=${startRequest}&_limit=${requestCount}`;
        this.setState({ isLoading: true });

        xmlhr.open("GET", url, true);
        xmlhr.onload = () => {
            if (xmlhr.readyState === xmlhr.DONE) {
                if (xmlhr.status === 200) {
                    const nextImages = JSON.parse(xmlhr.responseText)
                    this.setState({
                        startRequest: startRequest + requestCount,
                        images: [...images, ...nextImages],
                        hasMore: (images.length >= startRequest),
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        error: true,
                        isLoading: false,
                    });
                }
            }
        };
        xmlhr.send();
    }
    handleScroll = () => {
        const { error, isLoading, hasMore } = this.state;
        const scrolling = this.getScrollLocation();

        if (error || isLoading || !hasMore) return;
        if (scrolling) {
            this.loadImages();
        }
    }
    handleCssChange = () => {
        const { layout } = this.state;

        const lastScrollY = window.scrollY;
        window.scrollTo(0, lastScrollY);

        const rand = [1, 2, 3, 4, 5];
        const randomNumber = (layout + 1) % rand.length;
        this.setState({
            layout: randomNumber,
            idTag: randomNumber,
        });
    }
    getScrollLocation = () => {
        const scrolling = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return scrolling;
    }
    showModal = (image, event) => {
        event.preventDefault();
        document.body.style.overflow = "hidden"
        document.body.style.overflow = "touch"
        this.setState({
            overflow: true,
            isOpen: true,
            url: image,
        });
    }
    closeModal = () => {
        document.body.style.overflow = "auto"
        this.setState({
            overflow: false,
            isOpen: false,
            url: "",
        });
    }

    render() {
        const { error, hasMore, isLoading, images,
            url, isOpen, layout, idTag
        } = this.state;

        if (error) {
            return (
                <div className="error">
                    <span>
                        images have not been fetched.
                    </span>
                </div>
            );
        }

        return (
            <React.Fragment>
                <NavBar />
                <div className="container-fluid galleryContainer" id="photos">
                    {
                        images.map(content => {
                            return (
                                <GalleryImage
                                    key={content.id}
                                    className={layout}
                                    id={idTag}
                                    src={content.url}
                                    alt={content.url}
                                    onClick={(event) => this.showModal(content.url, event)}
                                />
                            );
                        })
                    }
                    {isLoading && <Preloader />}
                    {!hasMore && <ScrollButton />}
                    {isOpen ? <Modal src={url} alt={url} onClick={this.closeModal} /> : null}
                    
                    <img src={icon} alt="icons8.com" className="layout-change-icon" onClick={this.handleCssChange} />

                    <div className="footer">
                        <footer>
                            <p>
                                &copy; Copyright message goes Here
                            </p>
                        </footer>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Gallery;