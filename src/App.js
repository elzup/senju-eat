import React, { Component } from 'react';
import './App.css';
import moment from 'moment'
import StoreBoard from './StoreBoard';
import axios from 'axios';
import ScheduleParser from './ScheduleParser'

const data = {
	stores: [
		{ name: "松屋", start: '00:00', end: '24:00', },
		{ name: "スーパーたなか", start: '09:00', end: '23:00', },
		{ name: "武蔵屋", start: '11:00', end: '25:00', },
	]
};


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stores: [],
		};
	}

	componentDidMount() {
		const uri = 'https://script.google.com/macros/s/AKfycbx6rj2KFsMDTqn2svyLXksyNJykgrfjfo5-2uthyS9peGFlDYg/exec';
		axios.get(uri, { 'Access-Control-Allow-Origin': '*' }).then((e) => {
			this.setState({ stores: e.data });
		});
	}

	render() {
		const storeBoards = [];
		this.state.stores.forEach((e) => {
			const store = ScheduleParser.parse(e);
			storeBoards.push(
				<StoreBoard
					{ ...store }
					key={e.name}
				/>
			);
		});

		return (
			<div className="App">
				<div className="App-header">
					<h2>Eat Senju</h2>
					<p>北千住の学生のための</p>
					<p>飲食店開店時間情報</p>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
					{ storeBoards }
				</div>
			</div>
		);
	}
}

export default App;
