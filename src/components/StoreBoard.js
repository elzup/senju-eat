import React from 'react';
import moment from 'moment'
import _ from 'lodash';

import { weekNames } from '../ScheduleParser'

moment.locale("ja",
	{
		relativeTime: {
			future: 'あと%s',
			past: '%s前',
			s: '%d秒',
			m: '1分',
			mm: '%d分',
			h: '1時間',
			hh: '%d時間',
			d: '1日',
			dd: '%d日',
		}
	});

const styles = {
	today: {
		borderLeft: 'solid lime',
		paddingLeft: '5px',
	},
	term: {
		paddingLeft: '5px',
	},
	nowTerm: {
		fontWeight: 'bold',
		paddingLeft: '5px',
	},
	card: {
		width: "250px",
		margin: "20px 5px 5px",
		borderRadius: "5px",
		padding: '20px',
		boxShadow: '0 3px 5px',
	},
};

class StoreBoard extends React.Component {

	constructor(props) {
		super(props);
		const { schedules, now } = props;

		const today = schedules[_.keys(weekNames)[now.weekday]] || schedules['base'];
		let isClose = false;
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

		this.state = {
			today,
			isClose,
			next,
		};
	}

	renderNextChange() {
		const { isClose, next } = this.state;
		if (isClose) {
			return (
				<p>開店まで { next.fromNow() }</p>
			);
		}
		return (
			<p>閉店まで { next.fromNow() }</p>
		);
	}

	renderDay(day, w) {
		const { today, next } = this.state;
		const isToday = today === day;
		if (!day) {
			return null;
		}
		const format = 'HH:mm';
		const line = _.map(day, (term) =>
			<span style={(today === day && term.end === next) ? styles.nowTerm : styles.term }>
				{term.start.format(format)} - {term.end.format(format)}
				</span>
		);
		return (
			<li key={w} style={isToday ? styles.today : {}}>
				{weekNames[w]} {line}
			</li>
		);
	};


	render() {
		console.log(this.props);
		const { name, schedules, category } = this.props;
		const { today, isClose } = this.state;

		const days = _.map(_.keys(weekNames), (w) => this.renderDay(schedules[w], w));
		return (
			<div className="Store" style={{ ...styles.card, background: isClose ? '#aaa' : 'white' }}>
				<span>{ isClose ? "閉店" : "開店" }</span>
				<h2>{ name }</h2>
				<p>{category}</p>
				{ this.renderNextChange() }
				<ul>
					{days}
				</ul>
			</div>
		);
	}
}

export default StoreBoard;
