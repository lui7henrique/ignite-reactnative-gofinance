export type Transaction = {
  amount: string;
  category: string;
  date: string;
  id: string;
  title: string;
  type: "positive" | "negative";
};
