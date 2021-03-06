import _ from 'lodash';
import moment from 'moment'


export const weekLib = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export const weekNames = {
	"base": '常',
	"monday": '月',
	"tuesday": '火',
	"wednesday": '水',
	"thursday": '木',
	"friday": '金',
	"saturday": '土',
	"sunday": '日',
	"holiday": '祝',
};

export default class ScheduleParser {

	static parse(row) {
		const { name, category } = row;
		const schedules = {};
		_.keys(weekNames).forEach((name) => {
			if (!row[name]) {
				schedules[name] = false;
				return;
			}
			schedules[name] = {
				times: ScheduleParser.parseTimes(row[name]),
				isRegularHoliday: row[name] === '00:00-00:00',
			};
		});
		return { schedules, name, category };
	}

	// 'HH:mm-HH:mm,HH:mm-HH:mm' => [{start: moment, end: moment}]
	static parseTimes(text) {
		return _.map(text.split(','), (e) => {
			const [ start, end ] = e.split('-');
			return {
				start: ScheduleParser.parseTime(start),
				end: ScheduleParser.parseTime(end),
				start_raw: start,
				end_raw: end,
			};
		});
	}

	// 'HH:mm' => moment
	static parseTime(text) {
		const [h, m] = _.map(text.split(':'), v => parseInt(v, 10));
		const mom = moment(`${('00' + (h % 24)).slice(-2)}-${('00' + m).slice(-2)}`, 'HH:mm');
		if (h >= 24) {
			mom.add(1, 'd');
		}
		return mom;
	}
}
