'use client';

import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, Snowflake, CloudOff, Loader2 } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  locationLabel: string;
  lat: number;
  lon: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const preference = localStorage.getItem('location-preference');
      
      let lat = 47.1625; // Center of Hungary
      let lon = 19.5033;
      let label = 'Magyarország';

      if (preference === 'allow') {
        // Step 1: Get location from IP
        try {
          const locRes = await fetch('https://ipapi.co/json/');
          const locData = await locRes.json();
          if (locData.latitude) {
            lat = locData.latitude;
            lon = locData.longitude;
            label = locData.city || 'Budapest';
          }
        } catch (e) {
          console.error('Location fetch failed, using default', e);
          label = 'Budapest';
        }
      }

      // Step 2: Get weather using coordinates
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const data = await res.json();
      
      if (data.current_weather) {
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          condition: getWeatherCondition(data.current_weather.weathercode),
          locationLabel: label,
          lat: lat,
          lon: lon
        });
      }
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    
    // Listen for custom event or storage change if we want to update immediately
    // For now, simple initial fetch is enough as the modal will trigger a re-render or the user will refresh
    const handleRefresh = () => fetchWeather();
    window.addEventListener('location-preference-updated', handleRefresh);
    return () => window.removeEventListener('location-preference-updated', handleRefresh);
  }, []);

  function getWeatherCondition(code: number) {
    if (code === 0) return 'sun';
    if (code >= 1 && code <= 3) return 'cloud';
    if (code >= 51 && code <= 67) return 'rain';
    if (code >= 71 && code <= 77) return 'snow';
    if (code >= 80 && code <= 82) return 'rain';
    if (code >= 95) return 'storm';
    return 'cloud';
  }

  const getIcon = (condition: string) => {
    switch (condition) {
      case 'sun': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloud': return <Cloud className="w-5 h-5 text-blue-400" />;
      case 'rain': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'snow': return <Snowflake className="w-5 h-5 text-blue-200" />;
      case 'storm': return <CloudLightning className="w-5 h-5 text-purple-500" />;
      default: return <CloudOff className="w-5 h-5 text-muted" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-xs text-muted animate-pulse">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Töltés...</span>
      </div>
    );
  }

  return (
    <a 
      href="https://open-meteo.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-2 bg-card border border-border rounded-full hover:bg-card-hover hover:border-brand transition-all cursor-pointer shadow-sm group/weather"
    >
      <div className="flex items-center justify-center">
        {weather ? getIcon(weather.condition) : <CloudOff className="w-5 h-5" />}
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-bold text-foreground group-hover/weather:text-brand transition-colors">
          {weather ? `${weather.temp}°C` : '--°C'}
        </span>
        <span className="text-[10px] text-muted font-medium uppercase tracking-wider truncate max-w-[110px]">
          {weather ? weather.locationLabel : 'Helyszín...'}
        </span>
      </div>
    </a>
  );
}
