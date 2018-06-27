import React from "react";
import "../css/header.css";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div id="branding">
          <a href=".">News</a>
        </div>
      </header>
    );
  }
}

export default Header;
