export const formatCurrency = (value: string) => {
  const formattedValue = value
    .replace(/\D/g, "") // Remove non-digit characters
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add thousands separator
  return "Rp " + formattedValue; // Add "Rp" as a prefix
};

export const parseCurrency = (value: string) => {
  const numericValue = value
    .replace(/Rp\s?|,/g, "") // Remove "Rp" prefix and commas
    .trim(); // Trim any whitespace
  return Number(numericValue); // Convert to number
};
