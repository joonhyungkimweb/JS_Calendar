import {
  getFirstDayOfWeek,
  getFirstDayOfMonth,
  DAY_IN_MILLISECONDS,
  DAYS_NAME,
}
  from '../utils/DateUtils';

const style = `
  <style>
    table {
      table-layout : fixed;
      width : 100%;
    }
    
    thead {
      text-align : center;  
    }
    
    tbody {
      text-align : right;
    }
    
    tbody td {
      padding-bottom: 6%;
    }
    
    tbody td:hover {
      background-color : #f0f0f0
    }
    
    td:nth-child(1){
      color : red;
    }
    
    td:nth-child(7){
      color : blue;
    }
    
    td.not-current-month{
      color : #D3D3D3;
    }

    td.today{
      background-color : #ffffaa;
    }
  </style>
`;

export default class CalendarDatesView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      ${style}
      <table>
        <thead>${DAYS_NAME.reduce((acc, day, index) => `${acc}<td>${day}</td>`, '')}</thead>
        <tbody></tbody>
      </table>
    `;

    this.$datesBody = this.shadowRoot.querySelector('tbody');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['date'];
  }

  set date(newDate) {
    this.setAttribute('date', newDate);
  }

  get date() {
    return new Date(this.getAttribute('date'));
  }

  get firstDate() {
    return getFirstDayOfWeek(getFirstDayOfMonth(this.date));
  }

  get calendarDates() {
    return Array.from({ length: 42 },
      (value, index) => new Date(this.firstDate.getTime() + DAY_IN_MILLISECONDS * index));
  }

  render() {
    this.$datesBody.innerHTML = this.calendarDates.reduce(
      (acc, date, index) => `${acc}
      ${index % 7 === 0 ? '<tr>' : ''}
        <td data-date="${date}" class="${this.addTdClasses(date)}">${date.getDate()}</td>
      ${index % 7 === 6 ? '</tr>' : ''}`,
      '',
    );
  }

  addTdClasses(date) {
    const classNames = [];

    if(date.toLocaleDateString() === new Date().toLocaleDateString()) {
      classNames.push('today');
    }

    if(date.getMonth() !== this.date.getMonth()) {
      classNames.push('not-current-month');
    }

    return classNames.join(' ');
  }

  attatchEvents({ onClick }){
    this.$datesBody.addEventListener('click', ({ target : { nodeName, dataset : { date }}}) => {
      if( nodeName === "TD"){
        onClick(date);
      }
    })
  }
}
