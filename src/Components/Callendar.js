import MonthView from './MonthView.js';

export default class Callendar {
    constructor({ $target, options }) {
        this.$target = $target;
        this.monthView = new MonthView({ currentdate: new Date() });
    }
}
