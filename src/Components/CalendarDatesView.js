import {
  getFirstDayOfWeek,
  getFirstDayOfMonth,
  DAY_IN_MILLISECONDS,
  DAYS_NAME,
} from '../utils/DateUtils';

export default class CalendarDatesView {
  constructor({ $calendar, initialState }) {
    this.$target = document.createElement('table');
    this.$daysHeader = document.createElement('thead');
    this.$daysHeader.innerHTML = DAYS_NAME.reduce((acc, day) => `${acc}<td>${day}</td>`, '');
    this.$target.appendChild(this.$daysHeader);

    this.$daysBody = document.createElement('tbody');
    this.$target.appendChild(this.$daysBody);

    $calendar.appendChild(this.$target);

    this.state = initialState;

    this.render();
  }

  get firstDate() {
    return getFirstDayOfWeek(getFirstDayOfMonth(this.state));
  }

  get calendarDates() {
    return Array.from(
      { length: 42 },
      (value, index) => new Date(this.firstDate.getTime() + DAY_IN_MILLISECONDS * index),
    );
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$daysBody.innerHTML = this.calendarDates.reduce(
      (acc, date, index) => `${acc}
      ${index % 7 === 0 ? '<tr>' : ''}
        <td>${date.getDate()}</td>
      ${index % 7 === 6 ? '</tr>' : ''}`,
      '',
    );
  }
}
