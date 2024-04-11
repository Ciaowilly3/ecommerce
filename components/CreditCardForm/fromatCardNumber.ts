export const formatCardNumber = (cardNumber: string) =>
  cardNumber.replaceAll('-', '').length % 4 === 0
    ? (cardNumber += '-')
    : cardNumber;
