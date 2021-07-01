import CalendarDatesView from "./CalendarDatesView.js";

export default class Calendar {
  constructor({ $calendar, options }) {
    this.$calendar = $calendar;

    this.state = {
      today: {
        value: new Date(),
      },
    };

    this.datesView = new CalendarDatesView({
      $calendar,
      initialState: this.getState("today"),
    });

    this.render();
  }

  getState(key) {
    return this.state[key].value;
  }

  setState(key, newState) {
    this.state[key] = newState;
  }

  render() {
    this.datesView.render();
  }
}
