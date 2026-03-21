'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

export default function NamedayWidget() {
  const [nameday, setNameday] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNameday() {
      try {
        // Using local API proxy to avoid CORS issues
        const res = await fetch('/api/nameday');
        const data = await res.json();
        
        if (data && !data.error) {
           // Handle various API formats:
           // 1. [name1, name2]
           // 2. [{name: name1}, ...]
           // 3. { names: [...] }
           let names = null;
           
           if (Array.isArray(data)) {
             names = data.map(item => typeof item === 'object' ? item.name : item).filter(Boolean);
           } else if (data.names && Array.isArray(data.names)) {
             names = data.names;
           } else {
             // Try to find any property that is an array (like the old API format)
             const firstKey = Object.keys(data)[0];
             if (Array.isArray(data[firstKey])) {
               names = data[firstKey];
             }
           }

           if (names && names.length > 0) {
             setNameday(names.join(', '));
           }
        }
      } catch (error) {
        console.error('Failed to fetch nameday:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNameday();
  }, []);

  if (loading) return null;
  if (!nameday) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-medium text-foreground/80 shadow-sm">
      <Calendar className="w-3.5 h-3.5 text-brand" />
      <span>Mai névnap: <span className="text-foreground font-bold">{nameday}</span></span>
    </div>
  );
}
