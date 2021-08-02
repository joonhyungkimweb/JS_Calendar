import Calendar from "./Components/Calendar";
import CalendarDatesView from "./Components/CalendarDatesView";
import CalendarHeaderView from "./Components/CalendarHeaderView";
import CalendarDateModal from "./Components/CalendarDateModal";

window.customElements.define("calendar-date-modal", CalendarDateModal);
window.customElements.define("calendar-dates-view", CalendarDatesView);
window.customElements.define("calendar-header-view", CalendarHeaderView);
window.customElements.define("calendar-view", Calendar);
