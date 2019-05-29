import React, { Component } from "react";


class Footer extends Component {
  styles = {
    backgroundColor: "#874d63",
    color: "white"
  };
  render() {
    return (
      <footer
        className="page-footer text-center fixed-bottom"
        style={this.styles}
      >
        <div>© 2019 Copyright: Sous-Chef Global</div>
      </footer>
    );
  }
}

export default Footer;
