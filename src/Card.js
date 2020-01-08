import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: this.props.zipcode,
      locationText: "",
      state: "",
      lat: "",
      long: "",
      population: "",
      totalWages: ""
    };
    getInfo(this.state.zipcode);
  }

  getInfo = zipcode => {};

  render() {
    return (
      <div>
        <p>{this.state.zipcode}</p>
      </div>
    );
  }
}

export default Card;

locationText;
state;
location;
population;
totalWages;
