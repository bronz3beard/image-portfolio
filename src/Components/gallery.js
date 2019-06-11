import React, { PureComponent } from "react";

//Components
import Preloader from "./preloader";
import GalleryImage from "./gallery-image";
import Modal from "./modal";
import ScrollButton from "./scroll-to-top";

//Icons
import icon from "../Icons/puzzle.png";

//let number = 200; //Math.floor((Math.random() * 100) + 100);
//let className = Math.floor(Math.random() * 0) + 7;

class Gallery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            hasMore: false,
            requestCount: 15,
            startRequest: 0,
            isLoading: false,
            images: [],

            isOpen: false,
            url: "",

            Class: 0,
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
    handleScroll = () => {
        const {error, isLoading, hasMore} = this.state;
        const scrolling = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight;

        if (error || isLoading || !hasMore) return;
        if (scrolling) {
            this.loadImages();
        }
    }
//Initial call to the server for data
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
handleCssChange = () => {
    const { Class } = this.state;

    const rand = [1, 2, 3, 4, 5, 6, 7, 8];
    var randomNumber = (Class + 1) % rand.length;

    this.setState({
        Class: randomNumber,
        idTag: randomNumber,
    });
    //console.log(randomNumber);
}
render() {
    const { error, hasMore, isLoading, images,
        url, isOpen, Class, idTag
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
        <div
            ref="galleryContainer"
            className="container-fluid galleryContainer"
            id="photos">
            {
                images.map(content => {
                    return (
                        <GalleryImage
                            key={content.id}
                            className={Class}
                            id={idTag}
                            src={content.url}
                            alt={content.url}
                            onClick={(event) => this.showModal(content.thumbnailUrl, event)}
                        />
                    );
                })
            }
            {isOpen ? <Modal onClick={this.closeModal} src={url} alt={url} /> : null}
            <img src={icon} alt="icons8.com" className="layout" onClick={this.handleCssChange} />
            <div className="footer">
                <footer>
                    <p>
                        &copy; Message goes Here
                    </p>
                </footer>
            </div>
            {isLoading && <Preloader />}
            {!hasMore && <ScrollButton />}
        </div>
    )
}
}

export default Gallery;