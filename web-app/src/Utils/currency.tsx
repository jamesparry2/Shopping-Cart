import currency from "currency-formatter";

export const formatGB = (price: number) =>
  currency.format(price, { locale: "en-GB" });
