import MonthView from './MonthView.js';

export default class Callendar {
    constructor({ $target, options }) {
        this.$target = $target;
        console.log(new MonthView(new Date()));
    }
}
