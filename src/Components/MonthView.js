import DateView from './DateView.js';

const getDateOffset = (date) => 1 - new Date(date.getFullYear(), date.getMonth(), 1).getDay();

export default class MonthView {
    constructor(date) {
        this.year = date.getFullYear();
        this.month = date.getMonth();
        
        const dateOffset = getDateOffset(date);
        
        this.dates = Array.from({ length: 35 }, (date, index) => new DateView(new Date(this.year, this.month, index + dateOffset)));
    }
}
