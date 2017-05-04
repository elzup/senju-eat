import React, { Component } from 'react';
import Spinner from 'react-spinkit';

import moment from 'moment'
import axios from 'axios';

import StoreBoard from './components/StoreBoard';
import ScheduleParser from './ScheduleParser'

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stores: [],
			now: moment(),
		};
	}

	tick() {
		console.log(this.state.now);
		this.setState({ now: this.state.now.add({ s: 1 }) });
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidMount() {
		this.interval = setInterval(this.tick.bind(this), 1000);

		const uri = 'https://script.google.com/macros/s/AKfycbx6rj2KFsMDTqn2svyLXksyNJykgrfjfo5-2uthyS9peGFlDYg/exec';
		axios.get(uri, { 'Access-Control-Allow-Origin': '*' }).then((e) => {
			this.setState({ stores: e.data });
		});
	}

	render() {
		const storeBoards = [];
		const {now, stores} = this.state;

		stores.forEach((e) => {
			const store = ScheduleParser.parse(e);
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
					<div>
						<p>{now.format('HH:mm')}</p>
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
