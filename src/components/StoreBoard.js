import React from 'react';
import moment from 'moment'
import _ from 'lodash';

import { weekNames, weekLib } from '../ScheduleParser'

moment.locale("ja",
	{
		weekdays: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
		weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
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
		},
	});

const styles = {
	today: {
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
		width: "213px",
		margin: "3px",
		padding: '5px',
		boxShadow: '0 2px 1px',
	},
	name: {
		padding: 0,
		margin: 0,
	},
};

class StoreBoard extends React.Component {

	constructor(props) {
		super(props);
		const { schedules, now } = props;

		const today = schedules[weekLib[now.weekday]] || schedules['base'];
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
			<span key={term.start.format(format)}
						style={(today === day && term.end === next) ? styles.nowTerm : styles.term }>
				{term.start.format(format)}-{term.end.format(format)}
				</span>
		);
		return (
			<li key={w} style={isToday ? styles.today : {}}>
				{weekNames[w]} {line}
			</li>
		);
	};


	render() {
		const { name, schedules, category } = this.props;
		const { isClose } = this.state;

		const days = _.map(_.keys(weekNames), (w) => this.renderDay(schedules[w], w));
		return (
			<div className="Store" style={{ ...styles.card, background: isClose ? '#aaa' : 'white' }}>
				<h3 style={styles.name}>{ name }</h3>
				{ this.renderNextChange() }
				<ul>
					{days}
				</ul>
			</div>
		);
	}
}

export default StoreBoard;
