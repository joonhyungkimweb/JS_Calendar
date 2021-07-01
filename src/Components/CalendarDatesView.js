import {
  getFirstDayOfWeek,
  getFirstDayOfMonth,
  DAY_IN_MILLISECONS,
} from "../utils/DateUtils.js";

export default class CalendarDatesView {
  constructor({ $calendar, initialState }) {
    this.$target = document.createElement("table");

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
      (value, index) =>
        new Date(this.firstDate.getTime() + DAY_IN_MILLISECONS * index)
    );
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.calendarDates.reduce(
      (acc, date, index) =>
        `${acc}
      ${index % 7 === 0 ? "<tr>" : ""}
        <td>${date.getDate()}</td>
      ${index % 7 === 6 ? "</tr>" : ""}`,
      ""
    );
  }
}
