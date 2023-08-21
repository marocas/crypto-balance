// src/components/CryptoGrowthTable.tsx
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import CoinTableRow from './CoinTableRow';
import { GrowthData } from './CryptoGrowthComponent';

interface CryptoGrowthTableProps {
  selectedCryptocurrencies: string[];
  targetCurrency: string;
  growthDataMap: Record<string, GrowthData>;
}

const CryptoGrowthTable: React.FC<CryptoGrowthTableProps> = ({
  selectedCryptocurrencies,
  targetCurrency,
  growthDataMap,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cryptocurrency</TableCell>
            <TableCell>Start Price</TableCell>
            <TableCell>End Price</TableCell>
            <TableCell>Growth Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedCryptocurrencies.map(cryptocurrencySymbol => (
            <CoinTableRow
              key={cryptocurrencySymbol}
              cryptocurrencySymbol={cryptocurrencySymbol}
              targetCurrency={targetCurrency}
              growthData={growthDataMap[cryptocurrencySymbol]}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CryptoGrowthTable;
