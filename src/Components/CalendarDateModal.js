const style = `
  <style>
    article{
        position : fixed;
        left : 0;
        top : 0;
        background-color : rgba(0,0,0,0.5);
        width : 100vw;
        height : 100vh;
        display : none;
    }

    article[visible] {
        display : block;
    }

    .modal {
        position : absolute;
        left : 50%;
        top : 50%;
        transform: translate(-50%, -50%);
        background-color : #ffffff;
        border: 1px solid transparent;
        border-radius: 5px;
    }

    .modal-body {
    }
  </style>
`;

export default class CalendarDateModal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
    ${style}
    <article>
        <section class="modal">
            <header>
                <h1>${this.date}</h1>
            </header>
            <section class="modal-body">
            </section>
        </section>
    </article>
    `;

    this.$modalTitle = this.shadowRoot.querySelector('h1')

    this.$modalContainer = this.shadowRoot.querySelector('article');

    this.visible = false;

    window.addEventListener('keyup', ({ key }) =>{
        if(this.visible && key === "Escape"){
            this.visible = false;
        }
    })
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

  set visible (visible){
    if(visible){
      this.$modalContainer.setAttribute('visible', '');
    }else{
        this.$modalContainer.removeAttribute('visible');
    }
  }

  get visible() {
    return this.$modalContainer.getAttribute('visible') === '';
  }

  set date(newDate) {
    this.setAttribute('date', newDate);
  }

  get date() {
    return new Date(this.getAttribute('date'));
  }

  render() {
      this.$modalTitle.innerText = this.date;
  }

  showModal(){

  }
}
