function formatUSDT(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // نمایش دو رقم اعشار
    maximumFractionDigits: 2,
  }).format(price);
}
export default formatUSDT;
