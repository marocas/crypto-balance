// pages/api/crypto-growth.ts
import { GrowthData } from '@/components/CryptoGrowthComponent';
import { fetchCryptoGrowth } from '@/pages/api/api';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { selectedCryptocurrencies, targetCurrency } = req.body;
  const growthDataMap: Record<string, GrowthData> = {};

  await Promise.all(
    selectedCryptocurrencies.map(async (cryptocurrencySymbol: string) => {
      const growthData = await fetchCryptoGrowth(
        cryptocurrencySymbol,
        targetCurrency
      );
      growthDataMap[cryptocurrencySymbol] = growthData;
    })
  );

  res.status(200).json(growthDataMap);
};
