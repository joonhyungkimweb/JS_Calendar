import CalendarDatesView from './CalendarDatesView.js';

export default class Calendar {
    constructor({ $calendar, options }) {
        this.$calendar = $calendar;
        this.datesView = new CalendarDatesView({ $calendar, initialDate: new Date() });

        this.render();
    }

    render() {
        this.datesView.render();
    }
}
