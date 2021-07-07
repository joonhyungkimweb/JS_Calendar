import { getPrevMonth, getNextMonth } from '../utils/DateUtils';

import CalendarHeaderView from './CalendarHeaderView';
import CalendarDatesView from './CalendarDatesView';

/* global HTMLElement */
export default class Calendar extends HTMLElement{
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
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
    
    this.shadowRoot.appendChild(this.headerView);

    this.shadowRoot.appendChild(this.datesView);

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
