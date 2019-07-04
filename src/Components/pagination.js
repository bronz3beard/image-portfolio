import React, { PureComponent } from "react";

//Styles
import "../Styles/pagination.css";

class Pagination extends PureComponent {
    handlePageChange = (data, event) => {
        this.props.handlePageChange(data, event)
    }
    render() {
        const { data } = this.props;

        const nextPage = <li
            id="0"
            className="next"
            title="next"
            onClick={(event) => this.handlePageChange(data, event)}
        >
            &rang;&rang;
        </li>;

        const previousPage = <li
            id="1"
            className="previous"
            title="previous"
            onClick={(event) => this.handlePageChange(data, event)}
        >
            &lang;&lang;
        </li>;

        return (
            <span className="pagination-wrapper">
                <ul className="pagination">
                    {previousPage}
                    {nextPage}
                </ul>
            </span>
        )
    }
}

export default Pagination;