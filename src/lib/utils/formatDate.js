export function isoStringToDateString(isoString) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(isoString);
  const dateString = `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  return dateString;
}
