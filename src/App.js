import React, { Component } from 'react';
import './App.css';
import moment from 'moment'
import StoreBoard from './StoreBoard';

const data = {
	stores: [
		{ name: "松屋", start: '00:00', end: '24:00', },
		{ name: "スーパーたなか", start: '09:00', end: '23:00', },
		{ name: "武蔵屋", start: '11:00', end: '01:00', },
	]
};

class App extends Component {
	render() {
		const storeBoards = [];
		data.stores.forEach((e) => {
			storeBoards.push(
				<StoreBoard
					key={e.name}
					name={e.name}
					start={moment(e.start, 'HH:mm')}
					end={moment(e.end, 'HH:mm')}
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
				<div style={{ display: 'flex' }}>
					{ storeBoards }
				</div>
			</div>
		);
	}
}

export default App;
