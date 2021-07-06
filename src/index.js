import Calendar from './Components/Calendar';
import { CalendarDatesViewElements } from './Components/CalendarDatesView';

window.customElements.define('calendar-dates-view', CalendarDatesViewElements);

const cal = new Calendar({ $calendar: document.querySelector('#calendar') });
