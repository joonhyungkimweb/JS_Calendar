/* global HTMLElement */
export default class CalendarHeaderView extends HTMLElement {
  constructor({ onPrevMonth, onNextMonth }) {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <h1></h1>
      <button id="prev-button"> < </button>
      <button id="next-button"> > </button>
    `

    this.$yearMonthMonitor = this.shadowRoot.querySelector('h1')
    this.$prevButton = this.shadowRoot.querySelector('#prev-button')
    this.$nextButton = this.shadowRoot.querySelector('#next-button')

    this.$prevButton.addEventListener('click', onPrevMonth)
    this.$nextButton.addEventListener('click', onNextMonth)
    
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

  disconnectedCallback() {

  }

  render() {
    this.$yearMonthMonitor.innerHTML = `${this.date.getFullYear()}/${this.date.getMonth() + 1}`;
  }
}
