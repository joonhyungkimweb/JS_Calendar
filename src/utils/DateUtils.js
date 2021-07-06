export const DAY_IN_MILLISECONDS = 8.64e+7;

export const DAYS_NAME = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const getFirstDayOfWeek = (date) => new Date(date.getFullYear(), date.getMonth(), (date.getDate() - date.getDay()));

export const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

export const getPrevMonth = (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1);

export const getNextMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);
