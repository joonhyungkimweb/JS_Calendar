import Calendar from './Components/Calendar';
import CalendarDatesView from './Components/CalendarDatesView';
import CalendarHeaderView from './Components/CalendarHeaderView';

window.customElements.define('calendar-dates-view', CalendarDatesView);
window.customElements.define('calendar-header-view', CalendarHeaderView);

const cal = new Calendar({ $calendar: document.querySelector('#calendar') });