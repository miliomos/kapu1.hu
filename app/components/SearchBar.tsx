"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl w-full group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-muted group-focus-within:stroke-brand transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Keresés a weben (Google)..." 
        className="w-full bg-card border border-border rounded-[24px] py-5 pl-12 pr-6 text-foreground placeholder-muted outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-lg"
      />
    </form>
  );
}
