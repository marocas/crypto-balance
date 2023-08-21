// src/api.ts
export const fetchCryptoGrowth = async (
  cryptocurrencySymbol: string,
  targetCurrency: string
) => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const startOfYearTimestamp = Math.floor(startOfYear.getTime() / 1000);
  const currentTimestamp = Math.floor(currentDate.getTime() / 1000);

  const apiUrl = `https://api.coingecko.com/api/v3/coins/${cryptocurrencySymbol}/market_chart/range?vs_currency=${targetCurrency}&from=${startOfYearTimestamp}&to=${currentTimestamp}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  const prices: [number, number][] = data.prices;

  const startPrice = prices[0][1];
  const endPrice = prices[prices.length - 1][1];
  const growthPercentage = ((endPrice - startPrice) / startPrice) * 100;

  return {
    startPrice,
    endPrice,
    growthPercentage,
  };
};
