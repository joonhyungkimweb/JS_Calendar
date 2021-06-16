import WeekView from './WeekView.js'
const getDateOffset = (date) => 1 - new Date(date.getFullYear(), date.getMonth(), 1).getDay();

export default class MonthView {
    constructor({ currentdate }) {
        this.year = currentdate.getFullYear();
        this.month = currentdate.getMonth();

        const dateOffset = getDateOffset(currentdate);

        this.weeks = Array.from({ length: 5 }, (date, index) => new WeekView({ startDate: new Date(this.year, this.month, (7 * index) + dateOffset) }));
    }
}
