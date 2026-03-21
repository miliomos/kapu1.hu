'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Euro } from 'lucide-react';

interface Rates {
  EUR: number;
  USD: number;
}

export default function CurrencyWidget() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        // Fetching EUR/HUF and USD/HUF from a free API
        // We'll fetch EUR and USD separately or find one that has both relative to HUF
        // ExchangeRate-API is reliable for current rates
        const eurRes = await fetch('https://open.er-api.com/v6/latest/EUR');
        const eurData = await eurRes.json();
        
        const usdRes = await fetch('https://open.er-api.com/v6/latest/USD');
        const usdData = await usdRes.json();

        if (eurData.rates && usdData.rates) {
          setRates({
            EUR: Math.round(eurData.rates.HUF * 100) / 100,
            USD: Math.round(usdData.rates.HUF * 100) / 100
          });
        }
      } catch (error) {
        console.error('Failed to fetch rates:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  if (loading) return null;
  if (!rates) return null;

  return (
    <div className="flex items-center gap-4 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-medium text-foreground/80 shadow-sm">
      <div className="flex items-center gap-1.5 pr-3 border-r border-border/50">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 text-blue-500">
          <Euro className="w-3 h-3" />
        </div>
        <span>{rates.EUR} Ft</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/10 text-green-500">
          <DollarSign className="w-3 h-3" />
        </div>
        <span>{rates.USD} Ft</span>
      </div>
      <TrendingUp className="w-3.5 h-3.5 text-muted ml-1" />
    </div>
  );
}
