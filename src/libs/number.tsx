export const NumberFormat = (number?: string | number, digits: number = 2) => {
    if (!number) return 0;
    if (!Number(number)) return 0;
    if (typeof number === "string" && !parseFloat(number)) return 0;
    return number.toLocaleString(undefined, { maximumFractionDigits: digits });
  };
  