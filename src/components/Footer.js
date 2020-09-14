import React from "react";

class Footer extends React.Component {
  homeIcon = require("./../assets/home.svg");
  addIcon = require("./../assets/add.svg");
  listIcon = require("./../assets/list.svg");

  render() {
    return (
      <div className="footer">
        <div className="footer__icon">
          <img className="w-100" src={this.homeIcon}></img>
        </div>
        <div className="footer__icon">
          <img className="w-100" src={this.addIcon}></img>
        </div>
        <div className="footer__icon">
          <img className="w-100" src={this.listIcon}></img>
        </div>
      </div>
    );
  }
}

export default Footer;
