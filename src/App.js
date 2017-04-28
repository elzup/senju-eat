import React, { Component } from 'react';
import './App.css';
import moment from 'moment'
import StoreBoard from './StoreBoard';
import axios from 'axios';

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
			const hm = e.end.split(':');
			const h = parseInt(hm[0], 10);
			let end = null;
			if (h < 24) {
				end = moment(e.end, 'HH:mm')
			} else {
				end = moment('0' + (h - 24) + ':' + hm[1], 'HH:mm');
				console.log('0' + (h - 24) + ':' + hm[1]);
				end.add(1, 'd');
			}
			storeBoards.push(
				<StoreBoard
					key={e.name}
					name={e.name}
					start={moment(e.start, 'HH:mm')}
					end={end}
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
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					{ storeBoards }
				</div>
			</div>
		);
	}
}

export default App;
