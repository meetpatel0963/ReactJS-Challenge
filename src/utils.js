export function compareDate(date, currentDate) {
    return new Date(date).getTime() <= currentDate;
}