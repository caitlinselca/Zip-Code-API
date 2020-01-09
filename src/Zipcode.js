import React, { Component } from "react";
import axios from "axios";

const Card = props => {
  return (
    <div className="card-container">
      <h2>{props.name}</h2>
      <ul>
        <li>State: {props.state}</li>
        <li>Location: {props.location}</li>
        <li>Population (estimated): {props.population}</li>
        <li>Total Wages: {props.wages}</li>
      </ul>
    </div>
  );
};
class Zipcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: "",
      zipInfo: [],
      isError: false
    };
  }

  handleChange = e => {
    this.setState({
      zipcode: e.target.value
    });
  };

  handleSubmit = e => {
    console.log("Zip Code: " + this.state.zipcode);
    axios
      .get(`https://ctp-zip-api.herokuapp.com/zip/${this.state.zipcode}`)
      .then(zip => {
        console.log(zip);
        let newState = zip.data.map(item => {
          return {
            name: item.LocationText,
            state: item.State,
            location: `(${item.Lat}, ${item.Long})`,
            population: item.EstimatedPopulation,
            wages: item.TotalWages
          };
        });
        this.setState({ zipInfo: newState, isError: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isError: true });
      });
  };

  render() {
    const Cards = this.state.zipInfo.map(item => (
      <Card
        name={item.name}
        state={item.state}
        location={item.location}
        population={item.population}
        wages={item.wages}
      ></Card>
    ));

    return (
      <div>
        <div className="header">
          <h1> Zip Code Search </h1>
        </div>
        <div className="content-container">
          <label> Zip Codes: </label>
          <input
            type="number"
            value={this.state.zipcode}
            name="zipcode"
            className="input-field"
            onChange={this.handleChange}
          ></input>
          <button className="search-button" onClick={this.handleSubmit}>
            Search
          </button>
        </div>
        <div className="cards-container">
          {this.state.isError ? <p> No Results </p> : ""}
          {Cards}
        </div>
      </div>
    );
  }
}

export default Zipcode;
