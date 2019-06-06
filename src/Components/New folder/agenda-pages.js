import React, { PureComponent } from "react";
import ReactMarkdown from "react-markdown";

//Components
import ScrollButton from "./scroll-to-top";

class AgendaPages extends PureComponent {
  render() {
    const { data, scrollToTop, pageChange } = this.props;
  
    const formatDate = string => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(string).toLocaleDateString([], options);
    };
    
    const contenfulDateTime = data.timeStamp;
    const dateFormat = data.timeStamp ? "Last Updated " + formatDate(contenfulDateTime) : null;

    return (
      <React.Fragment>
        <selection className={pageChange ? "" : "show-info"}>
          <div className={data.theme}>
            <header>
              <h2>
                {data.header}
              </h2>
            </header>
          </div>
          <article className={data.theme}>
            <h4>{dateFormat}</h4>
            {data.contentAssembly.map(items => {
              return (
                <div key={items.sys.id}>
                  <ReactMarkdown>{items.fields.textCopy}</ReactMarkdown>
                </div>
              );
            })}
          </article>
        </selection>
      <div className={data.theme}>        
        <ScrollButton scrollToTop={scrollToTop} />
      </div>
    </React.Fragment>
    );
  }
}

export default AgendaPages;