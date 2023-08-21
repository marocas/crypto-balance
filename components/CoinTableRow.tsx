// src/components/CoinTableRow.tsx
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { GrowthData } from './CryptoGrowthComponent';

interface CoinTableRowProps {
  cryptocurrencySymbol: string;
  targetCurrency: string;
  growthData: GrowthData;
}

const CoinTableRow: React.FC<CoinTableRowProps> = ({
  cryptocurrencySymbol,
  targetCurrency,
  growthData,
}) => {
  return (
    <TableRow>
      <TableCell>{cryptocurrencySymbol}</TableCell>
      <TableCell>{growthData?.startPrice}</TableCell>
      <TableCell>{growthData?.endPrice}</TableCell>
      <TableCell>{growthData?.growthPercentage.toFixed(2)}%</TableCell>
    </TableRow>
  );
};

export default CoinTableRow;
