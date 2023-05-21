export const convertUSDToPLN = (USD) => {
  if (typeof USD === 'string' || typeof USD === 'undefined') { 
    return NaN } else if (typeof USD !== 'string' && typeof USD !== 'number') {
      return 'Error'
    } else if (USD < 0) {
      return 'PLN 0.00'
    } else {
    const USDtoPLN = USD * 3.5;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PLN'
      });
    
      return formatter.format(USDtoPLN).replace(/\u00a0/g, ' ');
  }
}