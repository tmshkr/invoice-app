export function formatCurrency(amount: number) {
  const dollars = Math.floor(amount);
  const cents = Math.floor((amount - dollars) * 100);

  return `$${dollars}.${cents < 10 ? "0" + cents : cents}`;
}

export function truncate(str: string, n: number) {
  const words = str.split(" ");
  return words.length > n ? words.slice(0, n).join(" ") + "..." : str;
}
