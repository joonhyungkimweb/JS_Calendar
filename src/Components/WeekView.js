import DateView from './DateView.js';

export default class WeekView {
    constructor({ startDate }) {
        this.dates = Array.from({ length: 7 }, (date, index) =>
            new DateView({
                date: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + index)
            })
        );
    }
}
