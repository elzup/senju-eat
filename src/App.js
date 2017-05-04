import React, { Component } from 'react';
import Spinner from 'react-spinkit';

import moment from 'moment'
import axios from 'axios';
import _ from 'lodash';

import StoreBoard from './components/StoreBoard';
import ScheduleParser from './ScheduleParser'

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storesBase: [],
			stores: [],
			now: moment().add({d: 2}),
		};
	}

	tick() {
		this.setState({ now: this.state.now.add({ m: 1 }) });
		this.analyze();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidMount() {
		this.interval = setInterval(this.tick.bind(this), 1000 * 60);

		const uri = 'https://script.google.com/macros/s/AKfycbx6rj2KFsMDTqn2svyLXksyNJykgrfjfo5-2uthyS9peGFlDYg/exec';
		axios.get(uri, { 'Access-Control-Allow-Origin': '*' }).then((e) => {
			const storesBase = _.map(e.data, ScheduleParser.parse);
			this.setState({ storesBase });
			this.analyze();
		});
	}

	analyze() {
		this.setState({ stores: this.state.storesBase });
	}

	render() {
		const storeBoards = [];
		const {now, stores} = this.state;

		stores.forEach((store) => {
			storeBoards.push(
				<StoreBoard
					{ ...store }
					now={now}
					key={store.name}
				/>
			);
		});

		return (
			<div className="App">
				<div className="App-header">
					<div>
						<h2>Eat Senju</h2>
						<p>北千住の学生のための</p>
						<p>飲食店開店時間情報</p>
					</div>
					<div className="timer">
						<p>{now.format("MM/DD(ddd)")}</p>
						<h2>{now.format("hh:mm")}</h2>
					</div>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
					{ storeBoards }
				</div>
				<div hidden={stores.length > 0} style={{ width: '100px', margin: '10px auto', padding: '10px' }}>
					<Spinner spinnerName="wave" noFadeIn />
				</div>
			</div>
		);
	}
}

export default App;
