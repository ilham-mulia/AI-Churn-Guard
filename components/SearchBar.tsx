import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
        Mitigasi Risiko Churn
      </h1>
      <p className="text-slate-600 mb-8 max-w-lg mx-auto">
        Analisis berita terkini untuk mendeteksi tanda-tanda bahaya pada perusahaan klien Anda di Indonesia.
      </p>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Masukkan nama perusahaan (contoh: GoTo, Indofarma, Bukalapak)..."
          className="w-full pl-11 pr-32 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          disabled={isLoading}
        />
        <div className="absolute inset-y-2 right-2">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`h-full px-6 rounded-xl font-medium text-white transition-all shadow-sm ${
              isLoading || !query.trim()
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-95'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analisis
              </span>
            ) : (
              'Analisa'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
        <span>Pencarian populer:</span>
        <button onClick={() => { setQuery('GoTo Gojek Tokopedia'); }} className="hover:text-blue-600 hover:underline">GoTo</button>
        <span>&bull;</span>
        <button onClick={() => { setQuery('PT Waskita Karya'); }} className="hover:text-blue-600 hover:underline">Waskita Karya</button>
        <span>&bull;</span>
        <button onClick={() => { setQuery('PT Kimia Farma'); }} className="hover:text-blue-600 hover:underline">Kimia Farma</button>
      </div>
    </div>
  );
};

export default SearchBar;