const formatCurrency = (amount: number, lang: string): string => {
  const normalizedLang = (lang || "en").toLowerCase();
  if (normalizedLang.startsWith("fa")) {
    const formatted = new Intl.NumberFormat("fa-IR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 10000);
    return `${formatted} تومان`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default formatCurrency;
