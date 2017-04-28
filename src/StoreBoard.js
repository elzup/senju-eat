import React from 'react';
import './App.css';
import moment from 'moment'
import { weekNames } from './ScheduleParser'

moment.locale("ja",
	{
		relativeTime: {
			future: 'あと%s',
			past: '%s前',
			s: '秒',
			m: '1分',
			mm: '%d分',
			h: '1時間',
			hh: '%d時間',
			d: '1日',
			dd: '%d日',
		}
	});


class StoreBoard extends React.Component {

	constructor(props) {
		super(props);
		const { schedules, now } = props;

		const today = schedules[weekNames[now.weekday]] || schedules['base'];
		const isClose = now < today.start || today.end < now ;
		today.each
		this.state = {
			today,
			isClose,
		};
	}

	renderNextChange() {
		const { today } = this.props;
		const { isClose } = this.state;
		if (isClose) {
			return (
				<p>開店まで { today.start.fromNow() }</p>
			);
		}
		return (
			<p>閉店まで { today.end.fromNow() }</p>
		);
	}

	render() {
		console.log(this.props);
		const { name, category } = this.props;
		const { today, isClose } = this.state;
		const format = 'HH:mm';
		return (
			<div className="Store" style={{
				width: "200px",
				margin: "20px",
				background: isClose ? '#aaa' : 'orange',
				borderRadius: "5px",
				border: "solid 2px gray",
			}}>
				<h2>{ name }</h2>
				{ this.renderNextChange() }
				<p>{ today.start.format(format) } - { today.end.format(format) }</p>
				<p>{ category}</p>
			</div>
		);
	}
}

export default StoreBoard;
