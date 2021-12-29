export function monthlyStatsDate(dateToFormat: Date) {
  var months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };
  let date = new Date(dateToFormat);
  let month = date.getMonth() + 1;
  month = months[month];
  const day = date.getDate();
  switch (day) {
    case 1:
      return `${month}, ${day}st`;
    case 2:
      return `${month}, ${day}nd`;
    case 3:
      return `${month}, ${day}rd`;
    default:
      return `${month}, ${day}th`;
  }
}
