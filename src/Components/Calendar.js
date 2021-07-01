import CalendarDatesView from "./CalendarDatesView.js";

export default class Calendar {
  state = {
    today: {
      value: new Date(),
      components: []
    },
  };

  constructor({ $calendar, options }) {
    this.$calendar = $calendar;

    this.datesView = new CalendarDatesView({
      $calendar,
      initialState: this.getState("today"),
    });


    this.bindComponentToState('today', this.datesView);

    this.setState("today", new Date());

  }

  bindComponentToState(stateKey, component) {
    this.state[stateKey].components.push(component);
  }

  getState(key) {
    return this.state[key].value;
  }

  setState(key, newState) {
    this.state[key].value = newState;
    this.state[key].components.forEach((component) => component.setState(this.getState(key)));
  }

}
