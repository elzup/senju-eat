import React, { Component } from 'react';
import Spinner from 'react-spinkit';

import moment from 'moment'
import axios from 'axios';
import _ from 'lodash';

import { weekLib } from './ScheduleParser'

import StoreBoard from './components/StoreBoard';
import ScheduleParser from './ScheduleParser'

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storesBase: [],
			stores: [],
			now: moment(),
		};
	}

	tick() {
		this.setState({ now: this.state.now.clone().add({ m: 1 }) });
		this.analyze();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidMount() {
		this.interval = setInterval(this.tick.bind(this), 1000 * 60);

		const uri = 'https://script.google.com/macros/s/AKfycbx6rj2KFsMDTqn2svyLXksyNJykgrfjfo5-2uthyS9peGFlDYg/exec';
		axios.get(uri, { 'Access-Control-Allow-Origin': '*' }).then((e) => {
			const storesBase = e.data.map(ScheduleParser.parse);
			this.setState({ storesBase });
			this.analyze();
		});
	}

	analyze() {
		const { now } = this.state;
		const stores = this.state.storesBase.map((e) => {
			const { schedules } = e;
			// 今日のスケジュール
			const today = schedules[weekLib[now.clone().weekday()]] || schedules['base'];
			let isClose = false;
			// 空いているか判定、次の切り替わり時間の判定
			let next = today[0].start.clone().add({ d: 1 });
			_.each(today, (term) => {
				if (now <= term.start) {
					isClose = true;
					next = term.start;
					return false;
				}
				if (term.start < now && now < term.end) {
					isClose = false;
					next = term.end;
					return false;
				}
				isClose = true;
			});
			return { ...e, today, isClose, next };
		});
		this.setState({ stores });
	}

	render() {
		const { stores, now } = this.state;

		const openStoreBoards = stores.filter(e => !e.isClose).map((store) => (
			<StoreBoard
				{ ...store }
				key={store.name}
			/>
		));
		const closedStoreBoards = stores.filter(e => e.isClose).map((store) => (
			<StoreBoard
				{ ...store }
				key={store.name}
			/>
		));

		return (
			<div className="App">
				<div className="App-header">
					<div>
						<h2>Eat Senju</h2>
						<p>北千住の飯屋<br />営業時間</p>
					</div>
					<div className="timer">
						<p>{now.format("MM/DD(ddd)")}</p>
						<h2>{now.format("hh:mm")}</h2>
					</div>
				</div>
				<div hidden={stores.length > 0} style={{ width: '100px', margin: '10px auto', padding: '10px' }}>
					<Spinner spinnerName="wave" noFadeIn />loading
				</div>
				<div hidden={stores.length === 0} className="container">
					<h2>営業中</h2>
					<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
						{ openStoreBoards }
					</div>
					<h2>閉店・休憩中</h2>
					<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
						{ closedStoreBoards }
					</div>
				</div>
				<div className="App-footer">
					<div>
						ホーム画面に追加しよう！
					</div>
				</div>
			</div>
		);
	}
}

export default App;
