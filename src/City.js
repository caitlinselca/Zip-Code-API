import React, { Component } from "react";
import axios from "axios";

class City extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: "",
			cityInfo: [],
			states: [],
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
			.get(
				`https://ctp-zip-api.herokuapp.com/city/${this.state.city.toUpperCase()}`
			)
			.then(city => {
				this.setState({ cityInfo: city.data, isError: false });
			})
			.then(console.log(this.state.states))
			.catch(err => {
				console.log(err);
				this.setState({ isError: true, cityInfo: [] });
			});
	};

	render() {
		const Cards = this.state.cityInfo.map(zip => (
			<div className="city-card">
				<h3>{zip}</h3>
			</div>
		));
		return (
			<div>
				<div className="header-city">
					<h1> City Search </h1>
				</div>
				<div className="content-container">
					<label> City: </label>
					<input
						value={this.state.city}
						name="city"
						className="input-field"
						onChange={this.handleChange}
					></input>
					<button className="search-button" onClick={this.handleSubmit}>
						Search
					</button>
				</div>
				{this.state.isError ? <h2> No Results </h2> : ""}
				<div className="city-cards-container">{Cards}</div>
			</div>
		);
	}
}

export default City;
