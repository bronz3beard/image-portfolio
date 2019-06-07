import React, { PureComponent } from "react";

//Components
import Preloader from "./preloader";
import GalleryImage from "./gallery-image";
import Modal from "./modal";
import ScrollButton from "./scroll-to-top";

//let number = 200; //Math.floor((Math.random() * 100) + 100);
//let className = Math.floor(Math.random() * 0) + 7;

class Gallery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            Urls: [],
            url: "",
            isOpen: false,
            isLoading: false,
            error: false,
            hasMore: false,
            Class: 0,
            idTag: 0,
        }
    }
    componentDidMount() {
        const agendaUrl = this.getUrl();

        window.addEventListener("popstate", this.handleClick);
        
        this.handleScroll();
        this.loadData();

        if (agendaUrl) {
            // eslint-disable-next-line no-restricted-globals
            history.pushState(null, '', agendaUrl);
        }
    }
    // Binds our scroll event handler
    handleScroll = () => {
        window.onscroll = () => {
            const {
                loadData,
                state: {
                    error,
                    isLoading,
                    hasMore,
                },
            } = this;

            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            if (error || isLoading || !hasMore) return;

            // Checks that the page has scrolled to the bottom
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                loadData();
            }
        }
    }
    // Initial call to the server for records 
    loadData = () => {
        const { Urls } = this.state;
        const xmlhr = new XMLHttpRequest();
        const url = "https://jsonplaceholder.typicode.com/photos";
        xmlhr.open("GET", url, true);
        xmlhr.onload = () => {
            this.setState({ isLoading: true })
            if (xmlhr.readyState === xmlhr.DONE) {
                if (xmlhr.status === 200) {
                    const nextData = JSON.parse(xmlhr.responseText).map(items => ({
                        albumId: items.albumId,
                        id: items.id,
                        thumbnailUrl: items.thumbnailUrl,
                        title: items.title,
                        url: items.url
                    }));
                    console.log(Urls)
                    this.setState({
                        hasMore: (Urls.length < 100),
                        Urls: [
                            ...Urls,
                            ...nextData
                        ],
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
    getUrl = () => {
        const currentURL = window.location.pathname.split('/')[0];
        return `/${currentURL}`;
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
    handleClick = () => {
        const { pageChange } = this.state;
        this.setState({ pageChange: !pageChange });
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
        const { error, isLoading, Urls, hasMore,
            url, isOpen, Class, idTag
        } = this.state;
        const icon = "./Icons/index.png";

        if (isLoading) {
            return (
                <Preloader />
            );
        }
        if (error) {
            return (
                <div className="error">
                    <span>
                        images have not been fetched.
                    </span>
                </div>
            );
        }
        if (!hasMore) {
            return (
                <ScrollButton />
            );
        }
        return (
            <div
                refs="galleryContainer"
                className="container-fluid galleryContainer"
                id="photos">
                {
                    Urls.map(content => {
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
            </div>
        )
    }
}

export default Gallery;