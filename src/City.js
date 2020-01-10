import React, { Component } from "react";
import axios from "axios";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityInfo: [],
      isError: false
    };
  }

  handleChange = e => {
    this.setState({
      city: e.target.value
    });
  };

  // after pressing button, call zipcode API
  // parse response, create an object with desired data from API response
  // update state storing information about zip code
  handleSubmit = e => {
    console.log("City: " + this.state.city);
    axios
      .get(`https://ctp-zip-api.herokuapp.com/city/${this.state.city.toUpperCase()}`)
      .then(city => {
        this.setState({ cityInfo: city.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isError: true, cityInfo: [] });
      });
  };

  displayZipCodes = () => {
    const {cityInfo} = this.state;
    if(cityInfo.length > 0){
        let cityzips = Object.keys(this.state.cityInfo).map( (key) => {
          return <div class="cityzipcodes" key={key}>{this.state.cityInfo[key]}</div>;
        });
        return cityzips;
    }
  }

  render() {
    // loop through information about city
    // display zipcodes for each location

    return (
      <div>
        <div className="header-city">
          <h1> City Search </h1>
        </div>
        <div className="content-container">
          <label> City: </label>
          <input
            type="string"
            value={this.state.city}
            name="city"
            className="input-field"
            onChange={this.handleChange}
          ></input>
          <button className="search-button" onClick={this.handleSubmit}>
            Search
          </button>
        </div>
        <div className="cards-container">
        {this.state.isError ? <p> No Results </p> : ""}
        {this.displayZipCodes()}
        </div>
      </div>
    );
  }
}

export default City;