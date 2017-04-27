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
			d: '1日',
			dd: '%d日',
		}
	});


class StoreBoard extends React.Component {

	constructor(props) {
		super(props);
		const { start, end } = props;
		const isClose = moment.now() < start || end < moment.now() ;
		this.state = {
			isClose,
		};
	}

	renderNextChange() {
		const { start, end } = this.props;
		const { isClose } = this.state;
		if (isClose) {
			return (
				<p>開店まで { start.fromNow() }</p>
			);
		}
		return (
			<p>閉店まで { end.fromNow() }</p>
		);
	}

	render() {
		console.log(this.props);
		const { name, start, end } = this.props;
		const format = 'HH時mm分';
		return (
			<div className="Store" style={{
				width: "200px",
				margin: "20px",
				background: this.state.isClose ? '#aaa' : 'orange',
				borderRadius: "5px",
				border: "solid 2px gray",
			}}>
				<h2>{ name }</h2>
				{ this.renderNextChange() }
				<p>{ start.format(format) } - { end.format(format) }</p>
			</div>
		);
	}
}

export default StoreBoard;
