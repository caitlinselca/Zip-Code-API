import React, { Component } from "react";

class Zipcode extends Component {
  render() {
    return (
      <div>
        <div className="Header">
          <h1>Zipcode Search</h1>
        </div>
        <div className="Search">
          <label for="zipcode">Zip Code:</label>
          <input type="number" name="zipcode" id="zipcode"></input>
          <button class="zip-search">Search</button>
        </div>
      </div>
    );
  }
}

export default Zipcode;
