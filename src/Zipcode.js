import React, { Component } from "react";
import Cards from "./Cards";
class Zipcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: ""
    };
  }

  handleChange = e => {
    this.setState({ zipcode: e.target.value });
  };

  handleSubmit = e => {
    console.log("Zip Code: " + this.state.zipcode);
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div className="Header">
          <h1>Zip Code Search</h1>
        </div>
        <div className="Search">
          <label>Zip Code:</label>
          <input
            type="number"
            value={this.state.zipcode}
            name="zipcode"
            className="zipcode"
            onChange={this.handleChange}
          ></input>
          <button className="zip-search" onClick={this.handleSubmit}>
            Search
          </button>
        </div>
        <div className="Cards">
          <Cards zipcode={this.state.zipcode}></Cards>
        </div>
      </div>
    );
  }
}

export default Zipcode;
