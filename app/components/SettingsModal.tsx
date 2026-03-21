"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Settings, MapPin, MapPinOff } from "lucide-react";

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [locationPreference, setLocationPreference] = useState<string>("deny");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("location-preference");
    if (saved) setLocationPreference(saved);
  }, []);

  const handleLocationChange = (pref: string) => {
    localStorage.setItem("location-preference", pref);
    setLocationPreference(pref);
    window.dispatchEvent(new CustomEvent("location-preference-updated"));
  };

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer"
        aria-label="Beállítások"
      >
        <span className="hidden sm:inline">Beállítások</span>
        <Settings className="w-4 h-4 sm:hidden" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative bg-card border border-border shadow-2xl rounded-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">Beállítások</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-foreground">
                    Megjelenés
                  </label>
                  <p className="text-xs text-muted">
                    Válassz világos vagy sötét témát
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-background p-1 rounded-full border border-border">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
                      theme === "light" 
                        ? "bg-card shadow-sm text-foreground" 
                        : "text-muted hover:text-foreground"
                    }`}
                    aria-label="Világos téma"
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
                      theme === "dark" 
                        ? "bg-card shadow-sm text-foreground" 
                        : "text-muted hover:text-foreground"
                    }`}
                    aria-label="Sötét téma"
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-foreground">
                    Helymeghatározás
                  </label>
                  <p className="text-xs text-muted">
                    Helyi időjárás mutatása
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-background p-1 rounded-full border border-border">
                  <button
                    onClick={() => handleLocationChange("deny")}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
                      locationPreference === "deny" 
                        ? "bg-orange-500/10 text-orange-500 shadow-sm" 
                        : "text-muted hover:text-foreground"
                    }`}
                    aria-label="Elutasítva"
                  >
                    <MapPinOff className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleLocationChange("allow")}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
                      locationPreference === "allow" 
                        ? "bg-brand/10 text-brand shadow-sm" 
                        : "text-muted hover:text-foreground"
                    }`}
                    aria-label="Engedélyezve"
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-border flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-brand text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-hover transition-colors cursor-pointer"
              >
                Kész
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
