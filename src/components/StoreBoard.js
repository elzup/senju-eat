import React from 'react';
import moment from 'moment'
import _ from 'lodash';

import { weekNames } from '../ScheduleParser'

moment.locale("ja",
	{
		weekdays: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
		weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
		relativeTime: {
			future: '%s',
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
		color: "black",
	},
	otherday: {
		color: "#bbb",
	},
	term: {
		paddingLeft: '5px',
	},
	nowTerm: {
		fontWeight: 'bold',
		paddingLeft: '5px',
	},
	name: {
		padding: 0,
		margin: 0,
	},
};

class StoreBoard extends React.Component {

	renderNextChange() {
		const { isClose, next } = this.props;
		if (isClose) {
			return (
				<p className="next-text">{ next.fromNow() }後に開店</p>
			);
		}
		return (
			<p className="next-text">あと{ next.fromNow() }</p>
		);
	}

	renderDay(day, w) {
		const { isClose, today, next } = this.props;
		const isToday = today === day;
		if (!day) {
			return null;
		}
		// const format = 'HH:mm';
		const line = _.map(day.times, (term) =>
			<div key={term.start_raw}
					 style={(today === day && term.end === next) ? styles.nowTerm : styles.term }>
				{term.start_raw}-{term.end_raw}
			</div>
		);
		const holiday = <div style={styles.term}>定休日</div>;
		return (
			<li key={w} className="day-line" style={isClose || isToday ? styles.today : styles.otherday}>
				<div>{weekNames[w]}</div>
				<div className="day-line-terms">{day.isRegularHoliday ? holiday : line}</div>
			</li>
		);
	};


	render() {
		const { name, schedules, isClose } = this.props;

		const days = _.map(_.keys(weekNames), (w) => this.renderDay(schedules[w], w));
		return (
			<div className="card" style={{ ...styles.card, background: isClose ? '#aaa' : 'white' }}>
				<h3 style={styles.name}>{ name }</h3>
				<ul>
					{days}
				</ul>
				{ this.renderNextChange() }
			</div>
		);
	}
}

export default StoreBoard;
