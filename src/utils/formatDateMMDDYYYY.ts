export const formatDateMMDDYYYY = (date: string) => {
  const splittedDate = date.split("/");
  const day = splittedDate[0];
  const month = splittedDate[1];
  const year = splittedDate[2];

  const newDate = `${month}/${day}/${year}`;
  return newDate;
};
