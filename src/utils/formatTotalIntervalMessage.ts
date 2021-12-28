import { format } from "date-fns";

import pt from "date-fns/locale/pt";

export const formatTotalIntervalMessage = (
  firstTransactionDate: number,
  lastTransactionDate: number
) => {
  // days
  const firstTransactionDateDay = new Date(firstTransactionDate).getDate();
  const lastTransactionDateDay = new Date(lastTransactionDate).getDate();

  const firstTransactionDateMonthName = format(
    new Date(firstTransactionDate),
    "MMMM",
    {
      locale: pt,
    }
  );

  const lastTransactionDateMonthName = format(
    new Date(lastTransactionDate),
    "MMMM",
    {
      locale: pt,
    }
  );

  if (firstTransactionDateMonthName === lastTransactionDateMonthName) {
    return `de ${firstTransactionDateDay} à ${lastTransactionDateDay} de ${firstTransactionDateMonthName}`;
  } else {
    return `de ${firstTransactionDateDay} de ${firstTransactionDateMonthName} à ${lastTransactionDateDay} de ${lastTransactionDateMonthName}`;
  }
};
