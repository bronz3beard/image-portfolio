import React, { PureComponent, Fragment } from "react";
import ReactMarkdown from "react-markdown";

//Components
import NavBar from "./navbar";

class Contact extends PureComponent {
    state = {
        formControls: {
            email: {
                value: ""
            },
            name: {
                value: ""
            },
            password: {
                value: ""
            }
        }
    };
    changeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                [name]: value
            }
        });
    }
    render() {
        const { data } = this.props;

        const details = data.map((detail) => {
            return (
                <div key={detail.sys.id}>
                    <ReactMarkdown>
                        {detail.fields.copy}
                    </ReactMarkdown>
                </div>
            );
        })

        return (
            <Fragment>
                <NavBar />
                {details}
            </Fragment>
        );
    }
}

export default Contact;     