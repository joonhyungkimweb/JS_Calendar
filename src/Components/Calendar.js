import { getPrevMonth, getNextMonth } from '../utils/DateUtils';

import CalendarHeaderView from './CalendarHeaderView';
import CalendarDatesView from './CalendarDatesView';

const style = `
  <style>
    section {
      display : flex;
      justify-content : center;
    }
  </style>
`

export default class Calendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.shadowRoot.innerHTML = `
      ${style}
      <section>
      </section>
    `;

    this.components = [
      new CalendarHeaderView({
        onPrevMonth: () => {
          this.date = getPrevMonth(this.date);
        },
        onNextMonth: () => {
          this.date = getNextMonth(this.date);
        },
      }),
      new CalendarDatesView(),
    ];
  }

  connectedCallback() {
    this.date = new Date();
    this.render();
  }

  static get observedAttributes() {
    return ['date'];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.components.forEach((component) => {
      if (component[attrName] != null) {
        component[attrName] = newVal;
      }
    });
  }

  set date(newDate) {
    this.setAttribute('date', newDate);
  }

  get date() {
    return new Date(this.getAttribute('date'));
  }

  bindComponentToState(stateKey, component) {
    this.state[stateKey].components.push(component);
  }

  render() {
    this.components.forEach((component) => this.shadowRoot.querySelector('section').appendChild(component));
  }
}
