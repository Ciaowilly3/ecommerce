export const hideCardNumbers = (cardNumber: string) =>
  cardNumber.slice(12).padStart(16, '*');
