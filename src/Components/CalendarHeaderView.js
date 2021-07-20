const style = `
  <style>
    header {
      display : grid;
      grid-template-columns: 1fr 7fr 1fr;
      grid-template-areas:
        "prev title next";
    }
    
    h1 {
      grid-area : title;
      text-align : center;
      margin : 0;
    }
    
    #prev-button {
      grid-area : prev;
    }
    
    #next-button {
      grid-area : next;
    }
    
    button {
      background-color : transparent;
      border : 0;
      font-weight : 900;
      cursor : pointer;
    }
    
    button:hover {
      background : #f0ffff;
    }
    
  </style>
`

export default class CalendarHeaderView extends HTMLElement {
  constructor({ onPrevMonth, onNextMonth }) {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
    ${style}
    <header>
      <button id="prev-button"> < </button>
      <h1></h1>
      <button id="next-button"> > </button>
    </header>
    `;

    this.$yearMonthMonitor = this.shadowRoot.querySelector('h1');
    this.$prevButton = this.shadowRoot.querySelector('#prev-button');
    this.$nextButton = this.shadowRoot.querySelector('#next-button');

    this.$prevButton.addEventListener('click', onPrevMonth);
    this.$nextButton.addEventListener('click', onNextMonth);
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

  render() {
    this.$yearMonthMonitor.innerHTML = `${this.date.getFullYear()}/${this.date.getMonth() + 1}`;
  }
}
