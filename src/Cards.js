import React, { Component } from "react";
import axios from "axios";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: this.props.zipcode,
      resultInfo: []
    };
  }

  callZipcodeAPI = () => {
    let info = [];
    axios
      .get(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zipcode}`)
      .then(res => {
        res.data.forEach(data => {
          let resultInfo = {
            locationText: data.LocationText,
            state: data.State,
            lat: data.Lat,
            long: data.Long,
            population: data.EstimatedPopulation,
            totalWages: data.TotalWages
          };
          info.push(resultInfo);
        });
      });
    this.setState({ resultInfo: info });
  };

  componentDidMount() {
    if (this.state.zipcode) this.callZipcodeAPI();
  }

  render() {
    const resultInfo = this.state.resultInfo;

    if (!resultInfo.length) {
      return <p>No Results</p>;
    }

    return (
      <div>
        {resultInfo.map(info => (
          <li>{info.locationText}</li>
        ))}
      </div>
    );
  }
}

export default Cards;
