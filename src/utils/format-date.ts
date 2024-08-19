export const formatDate = (date: string | Date) => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

export const formatShortDate = (date: string | Date): string => {
  if (typeof date === 'string') {
    const fecha = date.split('-');
    return fecha[2] + '/' + fecha[1] + '/' + fecha[0];
  }

  return formatDate(date);
};
