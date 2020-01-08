import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: this.props.zipcode
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.zipcode}</p>
      </div>
    );
  }
}

export default Card;
