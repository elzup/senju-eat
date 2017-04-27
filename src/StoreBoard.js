import React from 'react';
import './App.css';
import moment from 'moment'

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
			d: 'un日',
			dd: '%d日',
		}
	});


class StoreBoard extends React.Component {
	render() {
		console.log(this.props);
		const { name, start, end } = this.props;
		const format = 'HH時mm分';
		const isClose = start < moment.now;
		return (
			<div className="Store" style={{
				width: "200px",
				margin: "20px",
				background: isClose ? 'red' : '#aaa'
			}}>
				<h2>{ name }</h2>
				<p>開店まで { start.fromNow() }</p>
				<p>{ start.format(format) } - { end.format(format) }</p>
			</div>
		);
	}
}

export default StoreBoard;
