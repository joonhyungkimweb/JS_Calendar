import { getPrevMonth, getNextMonth } from '../utils/DateUtils';

import CalendarHeaderView from './CalendarHeaderView';
import CalendarDatesView from './CalendarDatesView';

export default class Calendar {
  constructor({ $calendar, options }) {
    this.$calendar = $calendar;

    this.state = {
      date: {
        value: new Date(),
        components: [],
      },
    };

    this.headerView = new CalendarHeaderView({
      onPrevMonth: () => {
        this.setState('date', getPrevMonth(this.getState('date')));
      },
      onNextMonth: () => {
        this.setState('date', getNextMonth(this.getState('date')));
      },
    });
    
    
    this.bindComponentToState('date', this.headerView)

    this.datesView = new CalendarDatesView();
    
    this.bindComponentToState('date', this.datesView)
    
    this.setState('date', new Date())
    
    this.$calendar.appendChild(this.headerView);

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
    this.state[key].components.forEach((component) => component[key] = this.getState(key));
  }
}
