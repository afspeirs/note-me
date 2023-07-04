export function formatDate(date: string | Date) {
  const dateTime = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short' });
  return dateTime.format(typeof date === 'string' ? new Date(date) : date);
}
