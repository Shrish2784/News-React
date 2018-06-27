import React from "react";
import "../css/navs.css";

class Navs extends React.Component {
  render() {
    return (
      <div id="navs">
        <button
          onClick={this.props.onClick}
          className="EndpointButton"
          id="thButton"
          value="top-headlines"
        >
          Top Headlines
        </button>
        <button
          onClick={this.props.onClick}
          className="EndpointButton"
          id="eButton"
          value="everything"
        >
          Everything
        </button>
      </div>
    );
  }
}

export default Navs;
