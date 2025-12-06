import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import AnalysisDashboard from './components/AnalysisDashboard';
import { analyzeCompanyRisk } from './services/riskAnalysisService';
import { SearchState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<SearchState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const handleSearch = async (query: string) => {
    setState({ isLoading: true, error: null, data: null });
    
    try {
      const result = await analyzeCompanyRisk(query);
      setState({ isLoading: false, error: null, data: result });
    } catch (err: any) {
      setState({ 
        isLoading: false, 
        error: err.message || "Terjadi kesalahan saat menganalisis data.", 
        data: null 
      });
    }
  };

  const handleReset = () => {
    setState({ isLoading: false, error: null, data: null });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-1.5 rounded-md shadow-lg shadow-red-900/50">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-white text-lg block leading-none">ChurnGuard <span className="text-red-500">Pro</span></span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">Internal Risk Analysis</span>
              </div>
            </div>
            <div className="text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2 rounded-full">
              Tim Churn Management
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        
        {!state.data && !state.isLoading && !state.error && (
          <div className="mt-6 animate-fade-in-up w-full max-w-5xl mx-auto">
            <SearchBar onSearch={handleSearch} isLoading={state.isLoading} />
            
            {/* System Info Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-10">
              
              {/* Left Column: Purpose & Scope */}
              <div className="space-y-6">
                <div>
                   <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                     <span className="bg-blue-100 text-blue-700 p-1.5 rounded-md text-sm">🎯</span>
                     Fungsi & Kegunaan
                   </h3>
                   <p className="text-slate-600 leading-relaxed text-sm text-justify">
                     Alat ini dirancang khusus untuk <strong>Tim Churn Management</strong> guna mendeteksi sinyal risiko (Early Warning System) pada klien korporat. Tujuannya adalah mengetahui kondisi kesehatan perusahaan klien sebelum mereka memutuskan berhenti berlangganan.
                   </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
                  <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider relative z-10">Apa yang dicari alat ini?</h4>
                  <ul className="space-y-4 text-sm text-slate-600 relative z-10">
                     <li className="flex items-start gap-3">
                       <div className="bg-red-100 p-1 rounded text-red-600 mt-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                       <div>
                         <strong className="text-slate-900 block">Isu Keuangan (Financial Distress)</strong>
                         <span>Berita terkait gagal bayar utang, kerugian besar kuartalan, atau anjloknya harga saham.</span>
                       </div>
                     </li>
                     <li className="flex items-start gap-3">
                       <div className="bg-orange-100 p-1 rounded text-orange-600 mt-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
                       <div>
                         <strong className="text-slate-900 block">Efisiensi Ekstrem</strong>
                         <span>Indikasi PHK Massal (Layoff), penutupan cabang/pabrik, atau program pensiun dini.</span>
                       </div>
                     </li>
                     <li className="flex items-start gap-3">
                       <div className="bg-slate-100 p-1 rounded text-slate-600 mt-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg></div>
                       <div>
                         <strong className="text-slate-900 block">Status Hukum</strong>
                         <span>Gugatan PKPU (Penundaan Kewajiban Pembayaran Utang) atau status Pailit.</span>
                       </div>
                     </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: How It Works */}
              <div className="bg-slate-900 text-slate-300 rounded-xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                     <span className="bg-slate-700 p-1.5 rounded-md text-sm">⚙️</span>
                     Proses Analisis (How it Works)
                  </h3>

                  <div className="space-y-6 pl-2">
                    <div className="relative pl-8 border-l-2 border-slate-700 pb-1">
                       <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-900"></div>
                       <h5 className="text-white font-bold text-sm">1. Input & Validasi</h5>
                       <p className="text-xs mt-1 text-slate-400">Anda memasukkan nama PT. Sistem memvalidasi nama entitas.</p>
                    </div>
                    <div className="relative pl-8 border-l-2 border-slate-700 pb-1">
                       <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-slate-900"></div>
                       <h5 className="text-white font-bold text-sm">2. Live Crawling (1 Bulan Terakhir)</h5>
                       <p className="text-xs mt-1 text-slate-400">
                         AI melakukan pencarian Google secara real-time. Sistem <strong>secara otomatis memfilter</strong> berita yang lebih tua dari 30 hari untuk memastikan relevansi data.
                       </p>
                    </div>
                    <div className="relative pl-8 border-l-2 border-slate-700 pb-1">
                       <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-slate-900"></div>
                       <h5 className="text-white font-bold text-sm">3. Analisis Sentimen & Konteks</h5>
                       <p className="text-xs mt-1 text-slate-400">
                         AI membaca isi berita. Apakah berita "Tutup Cabang" itu karena bangkrut (Negatif) atau relokasi strategis (Netral)? AI menentukan konteksnya.
                       </p>
                    </div>
                    <div className="relative pl-8 border-l-2 border-slate-800">
                       <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900"></div>
                       <h5 className="text-white font-bold text-sm">4. Risk Scoring</h5>
                       <p className="text-xs mt-1 text-slate-400">
                         Output akhir berupa Level Risiko (High/Medium/Low) beserta rekomendasi tindakan untuk tim Sales/Account Manager.
                       </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 italic">
                  *Sistem menggunakan model AI Google Gemini 2.5 Flash yang terintegrasi dengan Google Search Grounding.
                </div>
              </div>
              
            </div>
          </div>
        )}

        {state.isLoading && (
           <div className="flex flex-col items-center justify-center mt-20">
             <div className="relative">
               <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
               <div className="absolute top-0 left-0 w-20 h-20 border-4 border-red-600 rounded-full animate-spin border-t-transparent"></div>
             </div>
             <p className="mt-8 text-xl font-bold text-slate-800 animate-pulse">Melakukan Investigasi Berita...</p>
             <p className="text-sm text-slate-500 mt-2 max-w-md text-center">
               Menganalisis artikel terkait PHK, penutupan cabang, dan isu finansial dalam 30 hari terakhir.
             </p>
           </div>
        )}

        {state.error && (
          <div className="w-full max-w-lg mt-10 bg-white border border-red-200 rounded-xl p-8 text-center shadow-lg">
             <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Analisis Terhenti</h3>
             <p className="text-slate-600 mb-6">{state.error}</p>
             <button onClick={handleReset} className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
               Coba Lagi
             </button>
          </div>
        )}

        {state.data && (
          <AnalysisDashboard data={state.data} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <p className="text-slate-300 font-bold text-sm">
              &copy; {new Date().getFullYear()} Tim Churn Management
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Platform Mitigasi Risiko Dini
            </p>
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
             <span>Data Source: Google Search Grounding</span>
             <span>•</span>
             <span>AI Model: Gemini 2.5 Flash</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;