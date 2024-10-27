export const formatCurrency = (number: number, showCurrency = true) => {
    if (showCurrency) {
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(number);
  
      //   if (Platform.OS !== "web") {
      //     return formatted.replace(/^(\D+)/, "$1 ")
      //   }
      return formatted;
    }
    return new Intl.NumberFormat("id-ID").format(number);
  };
  