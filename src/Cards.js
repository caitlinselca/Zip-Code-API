import React, { Component } from "react";
import axios from "axios";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: this.props.zipcode,
      resultInfo: [],
      calledAPI: false
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
    this.setState({ calledAPI: true });
  };

  componentDidMount() {
    this.callZipcodeAPI();
  }

  render() {
    const { resultInfo, calledAPI } = this.state;
    let display;

    if (calledAPI) {
      display = resultInfo.map(info => {
        return <p>{info.state}</p>;
      });
    }
    return (
      <div>
        {display}
        {console.log(calledAPI)}
        {/* {resultInfo.length ? (
          resultInfo.map(info => {
            return <p>{info.state}</p>;
          })
        ) : (
          <p>No Results</p>
        )}
        {console.log(resultInfo.length)} */}
      </div>
    );
  }
}

export default Cards;
