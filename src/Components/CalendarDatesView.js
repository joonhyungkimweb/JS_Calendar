import {
  getFirstDayOfWeek,
  getFirstDayOfMonth,
  DAY_IN_MILLISECONDS,
  DAYS_NAME,
}
from '../utils/DateUtils';

/*global HTMLElement*/
export class CalendarDatesViewElements extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <table>
        <thead>${DAYS_NAME.reduce((acc, day) => `${acc}<td>${day}</td>`, '')}</thead>
        <tbody></tbody>
      </table>
    `

    this.$datesBody = this.shadowRoot.querySelector('tbody')
  }

  connectedCallback() {
    this.render();
  }

  adoptCallback() {

  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  static get observedAttributes() {
    return ['date'];
  }

  set date(newDate) {
    this.setAttribute('date', newDate)
  }

  get date() {
    return new Date(this.getAttribute('date'));
  }

  get firstDate() {
    return getFirstDayOfWeek(getFirstDayOfMonth(this.date));
  }

  get calendarDates() {
    return Array.from({ length: 42 },
      (value, index) => new Date(this.firstDate.getTime() + DAY_IN_MILLISECONDS * index),
    );
  }
  
  disconnectedCallback() {
    
  }

  render() {
    this.$datesBody.innerHTML = this.calendarDates.reduce(
      (acc, date, index) => `${acc}
      ${index % 7 === 0 ? '<tr>' : ''}
        <td>${date.getDate()}</td>
      ${index % 7 === 6 ? '</tr>' : ''}`,
      '',
    );
  }

}