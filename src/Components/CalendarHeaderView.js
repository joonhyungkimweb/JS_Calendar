export default class CalendarHeaderView{

    constructor({ $calendar, initialState, onPrevMonth, onNextMonth}){
        this.$target = document.createElement("header");
        this.$prevMonthButton = document.createElement("button");
        this.$prevMonthButton.innerHTML = "<";
        this.$nextMonthButton = document.createElement("button");
        this.$nextMonthButton.innerText = ">";
        this.$yearMonthMonitor = document.createElement("h1");

        this.$prevMonthButton.addEventListener("click", onPrevMonth);

        this.$nextMonthButton.addEventListener("click", onNextMonth);

        this.$target.appendChild(this.$prevMonthButton);
        this.$target.appendChild(this.$yearMonthMonitor);
        this.$target.appendChild(this.$nextMonthButton);

        $calendar.appendChild(this.$target);
    
        this.state = initialState;

        this.render();
    }

    setState(newState) {
        this.state = newState;
        this.render();
      }

    render(){
        this.$yearMonthMonitor.innerHTML = `${this.state.getFullYear()}/${this.state.getMonth() + 1}`
    }

}