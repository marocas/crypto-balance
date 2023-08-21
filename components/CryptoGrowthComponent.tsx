import CryptoGrowthTable from '@/components/CryptoGrowthTable';
import { Autocomplete, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface CryptoGrowthProps {
  // No need for props in this case since we're allowing user input
}

export interface GrowthData {
  startPrice: number;
  endPrice: number;
  growthPercentage: number;
}

interface CoinOption {
  value: string;
  label: string;
}

const coinOptions: CoinOption[] = [
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'solana', label: 'Solana' },
  // Add more coin options here
];

const CryptoGrowthComponent: React.FC<CryptoGrowthProps> = () => {
  const [selectedCryptocurrencies, setSelectedCryptocurrencies] = useState<
    string[]
  >([]);
  const [targetCurrency, setTargetCurrency] = useState<string>('usd');
  const [growthDataMap, setGrowthDataMap] = useState<
    Record<string, GrowthData>
  >({});

  const fetchData = async () => {
    const response = await fetch('/api/crypto-growth', {
      method: 'POST',
      body: JSON.stringify({ selectedCryptocurrencies, targetCurrency }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setGrowthDataMap(data);
  };

  return (
    <div>
      <div>
        <Autocomplete
          multiple
          id="crypto-select"
          options={coinOptions}
          getOptionLabel={(option: CoinOption) => option.label}
          value={selectedCryptocurrencies.map(
            symbol => coinOptions.find(option => option.value === symbol)!
          )}
          onChange={(_, newValue) =>
            setSelectedCryptocurrencies(newValue.map(option => option.value))
          }
          filterOptions={(options, state) => {
            const inputValue = state.inputValue.toLowerCase();
            return options.filter(option =>
              option.label.toLowerCase().includes(inputValue)
            );
          }}
          renderInput={params => (
            <TextField {...params} label="Cryptocurrency Symbol" />
          )}
        />

        <TextField
          label="Target Currency"
          value={targetCurrency}
          onChange={e => setTargetCurrency(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={fetchData}>
          Fetch Growth Data
        </Button>
      </div>
      <CryptoGrowthTable
        selectedCryptocurrencies={selectedCryptocurrencies}
        targetCurrency={targetCurrency}
        growthDataMap={growthDataMap}
      />
    </div>
  );
};

export default CryptoGrowthComponent;
