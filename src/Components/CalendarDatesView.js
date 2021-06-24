const getDateOffset = (date) => 1 - new Date(date.getFullYear(), date.getMonth(), 1).getDay();

export default class CalendarDatesView {
    constructor({ $calendar, initialDate }) {
        this.$target = document.createElement('table');

        $calendar.appendChild(this.$target);

        this.state = initialDate;

        this.year = initialDate.getFullYear();
        this.month = initialDate.getMonth();

        const dateOffset = getDateOffset(initialDate);

        this.dates = Array.from({ length: 42 }, (date, index) => new Date(this.year, this.month, index + dateOffset));
    }

    render() {
        this.$target.innerHTML = this.dates.reduce((acc, date, index) =>
            `${acc}
        ${index % 7 === 0 ? '<tr>' : ''}
        <td>${date.getDate()}</td>
        ${index % 7 === 6 ? '</tr>' : ''}`, '');
    }

}
