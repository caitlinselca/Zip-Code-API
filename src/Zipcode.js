import React, { Component } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    "margin-left": "37vh",
    width: "15vw",
    textAlign: "center",
    "margin-bottom": "20px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.5)"
  },
  title: {
    fontSize: 14,
    color: "blue"
  },
  pos: {
    marginBottom: 12,
    color: "green"
  }
});

const ZipCard = props => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.name}
        </Typography>
        <Typography variant="body2" component="p">
          State: {props.state}
        </Typography>
        <Typography variant="body2" component="p">
          Location: {props.location}
        </Typography>
        <Typography variant="body2" component="p">
          Population (estimated): {props.population}
        </Typography>
        <Typography variant="body2" component="p">
          Total Wages: {props.wages}
          <br />
        </Typography>
      </CardContent>
    </Card>
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
        console.log(zip, zip.status);
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
        this.setState({ isError: true, zipInfo: [] });
      });
  };

  render() {
    const Cards = this.state.zipInfo.map(item => (
      <ZipCard
        name={item.name}
        state={item.state}
        location={item.location}
        population={item.population}
        wages={item.wages}
      ></ZipCard>
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
