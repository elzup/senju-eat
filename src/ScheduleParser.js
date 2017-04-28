import _ from 'lodash';
import moment from 'moment'

export class ScheduleParser {

	static parse(row) {
		const { name, category } = row;
		const weekNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "holiday"];
		const schedules = {};
		weekNames.forEach((name) => {
			schedules[name] = ScheduleParser.parseTimes(row[name]);
		});
		return { schedules, name, category };
	}

	// 'HH:mm-HH:mm,HH:mm-HH:mm' => [{start: moment, end: moment}]
	static parseTimes(text) {
		return _.map(text.split(','), (e) => {
			const { start, end } = e.split('-');
			return {
				start: ScheduleParser.parseTime(start),
				end: ScheduleParser.parseTime(end),
			};
		});
	}

	// 'HH:mm' => moment
	static parseTime(text) {
		const [h, m] = _.map(text.split(':'), v => parseInt(v, 10));
		const mom = moment(`${('00' + (h % 24)).slice(-2)}-${'00' + m.slice(-2)}`, 'HH:mm');
		if (h >= 24) {
			mom.add(1, 'd');
		}
		return mom;
	}
}