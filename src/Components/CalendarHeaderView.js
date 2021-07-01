export default class CalendarHeaderView{

    constructor({ $calendar, initialState}){
        this.$target = document.createElement("div");

        $calendar.appendChild(this.$target);
    
        this.state = initialState;

        this.render();
    }

    setState(newState) {
        this.state = newState;
        this.render();
      }

    render(){
        this.$target.innerHTML = `${this.state.getFullYear()}/${this.state.getMonth()}`
    }

}