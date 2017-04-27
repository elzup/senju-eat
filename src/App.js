import React, { Component } from 'react';
import './App.css';
import StoreBoard from './StoreBoard';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>Eat Senju</h2>
					<p>北千住の学生のための</p>
					<p>飲食店開店時間情報</p>
				</div>
				<div style={{ display: 'flex' }}>
					<StoreBoard
						name="松屋"
						start="9時"
						end="20時"
					/>
					<StoreBoard
						name="武蔵屋"
						start="9時"
						end="20時"
					/>
					<StoreBoard
						name="5号館"
						start="9時"
						end="20時"
					/>
				</div>
			</div>
		);
	}
}

export default App;
