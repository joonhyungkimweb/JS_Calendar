export const DAY_IN_MILLISECONDS = 8.64e+7;

export const getFirstDayOfWeek = (date) => new Date(date.getFullYear(), date.getMonth(),(date.getDate() - date.getDay()));

export const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);