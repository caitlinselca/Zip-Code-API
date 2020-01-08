import React, { Component } from "react";

class Zipcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: "11372"
    };
  }

  handleChange = e => {
    this.setState({ zipcode: e.target.value });
  };

  handleSubmit = e => {
    alert("Zip Code: " + this.state.zipcode);
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div className="Header">
          <h1>Zipcode Search</h1>
        </div>
        <div className="Search">
          <label for="zipcode">Zip Code:</label>
          <input
            type="number"
            value={this.state.zipcode}
            name="zipcode"
            id="zipcode"
            onChange={this.handleChange}
          ></input>
          <button class="zip-search" onClick={this.handleSubmit}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Zipcode;
