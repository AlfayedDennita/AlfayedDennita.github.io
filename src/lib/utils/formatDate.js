export function isoStringToDateString(isoString, time = true) {
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
  let dateString = `${date.getDate().toString().padStart(2, 0)}-${months[date.getMonth()]}-${date.getFullYear()}`;

  if (time) {
    dateString += ` ${date.getHours().toString().padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}`;
  }

  return dateString;
}
