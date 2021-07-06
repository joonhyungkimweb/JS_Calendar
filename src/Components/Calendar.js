import CalendarHeaderView from './CalendarHeaderView';
import { getPrevMonth, getNextMonth } from '../utils/DateUtils';

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
      $calendar,
      initialState: this.getState('today'),
      onPrevMonth: () => {
        this.setState('today', getPrevMonth(this.getState('today')));
      },
      onNextMonth: () => {
        this.setState('today', getNextMonth(this.getState('today')));
      },
    });

    this.datesView = document.createElement('calendar-dates-view')
    
    this.datesView.date = new Date();
    
    this.$calendar.appendChild(this.datesView);
    
    this.bindComponentToState('today', this.datesView);

    this.bindComponentToState('today', this.headerView);
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
