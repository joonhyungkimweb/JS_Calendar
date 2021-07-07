import { getPrevMonth, getNextMonth } from '../utils/DateUtils';

import CalendarHeaderView from './CalendarHeaderView';
import CalendarDatesView from './CalendarDatesView';

export default class Calendar {
  constructor({ $calendar, options }) {
    this.$calendar = $calendar;

    this.state = {
      today: {
        value: new Date(),
        components: [],
      },
    };

    this.headerView = new CalendarHeaderView({
      onPrevMonth: () => {
        // this.setState('today', getPrevMonth(this.getState('today')));
      },
      onNextMonth: () => {
        // this.setState('today', getNextMonth(this.getState('today')));
      },
    });
    
    this.headerView.date = new Date();

    this.$calendar.appendChild(this.headerView);

    this.datesView = new CalendarDatesView();

    this.datesView.date = new Date();

    this.$calendar.appendChild(this.datesView);

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
