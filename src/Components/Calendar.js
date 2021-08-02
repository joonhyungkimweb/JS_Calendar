import { getPrevMonth, getNextMonth } from "../utils/DateUtils";

const style = `
  <style>
    section {
      min-width : 320px;
    }
  </style>
`;

export default class Calendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      ${style}
      <section>
        <calendar-header-view date="${this.date}"> </calendar-header-view>
        <calendar-dates-view date="${this.date}"> </calendar-dates-view>
        <calendar-date-modal date="${this.date}" visible> </calendar-date-modal>
      </section>
    `;

    const headerView = this.shadowRoot.querySelector("calendar-header-view");
    const datesView = this.shadowRoot.querySelector("calendar-dates-view");
    const dateModal = this.shadowRoot.querySelector("calendar-date-modal");

    headerView.attachEvents({
      onPrevMonth: () => {
        this.date = getPrevMonth(this.date);
      },
      onNextMonth: () => {
        this.date = getNextMonth(this.date);
      },
    });

    datesView.attatchEvents({
      onClick : (date) => {
        dateModal.date = date;
        dateModal.visible = true;
      }
    })

    this.$children = [headerView, datesView, dateModal];
  }

  connectedCallback() {
    this.date = new Date();
    this.render();
  }

  static get observedAttributes() {
    return ["date"];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.$children.forEach((child) => {
        if (child[attrName] != null) {
          child[attrName] = newVal;
        }
      });
    }
  }

  set date(newDate) {
    this.setAttribute("date", newDate);
  }

  get date() {
    return new Date(this.getAttribute("date"));
  }

  bindComponentToState(stateKey, component) {
    this.state[stateKey].components.push(component);
  }

  render() {}
}
