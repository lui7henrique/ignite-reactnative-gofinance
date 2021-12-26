export const numberify = (value: string) => {
  const formattedValue = +parseFloat(
    value
      .trim()
      .replace(/^R\$ +/, "")
      .replace(/\./g, "")
      .replace(/,/, ".")
  ).toFixed(2);

  return formattedValue;
};
