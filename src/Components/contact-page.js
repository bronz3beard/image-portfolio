import React, { PureComponent, Fragment } from "react";
import ReactMarkdown from "react-markdown";

//Components
import NavBar from "./navbar";
import Animation from "./Canvas-Animation/animation";

//Styles
import "../Styles/canvas.css";

const AIRTABLE_API_KEY = process.env.REACT_APP_API_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_BASE;
const AIRTABLE_TABLE = process.env.REACT_APP_TABLE;

class Contact extends PureComponent {
    state = {
        formControls: {
            name: {
                value: ""
            },
            surname: {
                value: ""
            },
            email: {
                value: ""
            },
            location: {
                value: ""
            },
            subject: {
                value: ""
            },
            message: {
                value: ""
            }
        },
        //Mouse Coordinates
        coorx: 0,
        coory: 0,
        //Random Particle size and opacity
        /*radius: Math.random() * 30 - 15,*/
        /*opacity: Math.random() * 10 - 5,*/
        visable: false,
    };

    postToAirTable = () => {
        const { formControls } = this.state;
        //const base = new Airtable({ apiKey: REACT_APP_API_KEY }).base('appuhJdBl6QlAoRLl');
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`;
        const fields = {
            "fields": {
                "First Name": formControls.name.value,
                "Surname": formControls.surname.value,
                "Email": formControls.email.value,
                "Location": formControls.location.value,
                "Subject": formControls.subject.value,
                "Message": formControls.message.value,
            }
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${AIRTABLE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fields)
        }).then(() => {
            alert("Form Sent!");
            window.location.reload();
        }).catch(error => alert(error));
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.postToAirTable();        
    }
    changeHandler = (event) => {
        const { formControls } = this.state;
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...formControls,
                [name]: {
                    ...formControls[name],
                    value
                }
            }
        });
    }

    getRandomColor = () => {
        let r = 0, g = 0, b = 0;
        while (r < 100 && g < 100 && b < 100) {
            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
        }
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    handleMouseMoveEvent = (event) => {
        event.preventDefault();
        var offX = event.clientX;
        var offY = event.clientY;
        if (offY > 999) {
            offY = 999;
        }
        this.setState({
            coorx: offX,
            coory: offY,
        });
        //this.particle();
    }
    mouseOut = () => {
        this.setState({
            coorx: 0,
            coory: 0,
        });
    }
    mouseOver = () => {
        const { visable } = this.state;
        this.setState({
            visable: !visable,
        });
        console.log(visable);
    }
    render() {
        const { formControls, coorx, coory, radius, opacity } = this.state; //visable,
        const { data } = this.props;
        
        const details =
            <div key={data.sys.id} className={data.fields.theme}>
                <Animation
                    id="animation"
                    handleMouseEvent={this.handleMouseMoveEvent}
                    x={coorx}
                    y={coory}
                    radius={radius}
                    opacity={opacity}
                />
                <form id="contact-form" onSubmit={this.handleSubmit}>
                    <ReactMarkdown>
                        {data.fields.copy}
                    </ReactMarkdown>
                    <span><input type="text" name="name" placeholder="Name" value={formControls.name.value} onChange={(event) => this.changeHandler(event)} /></span>
                    <span><input type="text" name="surname" placeholder="Surname" value={formControls.surname.value} onChange={(event) => this.changeHandler(event)} /></span>
                    <span><input type="email" name="email" placeholder="Email" required value={formControls.email.value} onChange={(event) => this.changeHandler(event)} /></span>
                    <span>
                        <select id="country" name="location" placeholder="Select your location" onChange={(event) => this.changeHandler(event)}>
                            <option value="">Please select you location</option>
                            <option value="AU-AUS-36+61">Australia</option>
                            <option value="AR-ARG-32+54">Argentina</option>
                            <option value="UR-URY-858+598">Uruguay</option>
                        </select>
                    </span>
                    <span><input type="text" name="subject" placeholder="Topic" value={formControls.subject.value} onChange={(event) => this.changeHandler(event)} /></span>
                    <span><textarea rows="4" cols="50" name="message" placeholder="How can we help" value={formControls.message.value} onChange={(event) => this.changeHandler(event)} /></span>
                    <span><input type="submit" value="Post" /></span>
                </form>
            </div>

        return (
            <Fragment>
                <NavBar />
                {details}
            </Fragment>
        );
    }
}

export default Contact;     