import React from 'react';
import { AnalysisResult, RiskLevel } from '../types';

interface AnalysisDashboardProps {
  data: AnalysisResult;
  onReset: () => void;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ data, onReset }) => {
  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.HIGH:
        return 'bg-red-50 text-red-900 border-red-200';
      case RiskLevel.MEDIUM:
        return 'bg-orange-50 text-orange-900 border-orange-200';
      case RiskLevel.LOW:
        return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskBadgeColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.HIGH: return 'bg-red-600';
      case RiskLevel.MEDIUM: return 'bg-orange-500';
      case RiskLevel.LOW: return 'bg-emerald-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in pb-10">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-slate-800 text-white border border-slate-800">
                  Tim Churn Management
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-blue-100 text-blue-700 border border-blue-200">
                  Data 1 Bulan Terakhir
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">{data.companyName}</h2>
              <p className="text-slate-500 text-sm mt-1">
                Dianalisis pada: {data.analyzedAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <button 
              onClick={onReset}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 shadow-sm transition-colors"
            >
              Cek Perusahaan Lain
            </button>
          </div>

          <div className={`p-5 rounded-xl border flex flex-col md:flex-row md:items-start gap-4 ${getRiskColor(data.riskLevel)}`}>
             <div className="flex-shrink-0 mt-1.5 hidden md:block">
                <span className={`flex h-4 w-4 rounded-full shadow-sm ${getRiskBadgeColor(data.riskLevel)}`}></span>
             </div>
             <div className="flex-1">
               <div className="flex items-center gap-3 mb-2 md:mb-1">
                 <span className={`md:hidden flex h-3 w-3 rounded-full ${getRiskBadgeColor(data.riskLevel)}`}></span>
                 <h3 className="font-bold text-xl tracking-tight">STATUS RISIKO: {data.riskLevel}</h3>
               </div>
               
               <p className="text-sm leading-relaxed font-medium">
                 {data.riskLevel === RiskLevel.HIGH && "MITIGASI SEGERA: Terdeteksi sinyal kuat (PHK/Tutup Cabang/Masalah Keuangan). Potensi churn sangat tinggi. Segera jadwalkan meeting dengan C-Level klien."}
                 {data.riskLevel === RiskLevel.MEDIUM && "PERLU ATENSI: Ada indikasi efisiensi atau isu manajemen. Lakukan health-check layanan untuk mencegah eskalasi."}
                 {data.riskLevel === RiskLevel.LOW && "AMAN: Tidak ditemukan berita negatif signifikan dalam 1 bulan terakhir. Bisnis klien terlihat stabil."}
                 {data.riskLevel === RiskLevel.UNKNOWN && "Data tidak mencukupi untuk penilaian risiko."}
               </p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analysis Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Executive Summary
            </h3>
            <div className="prose prose-slate prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-line text-justify bg-slate-50 p-4 rounded-lg border border-slate-100">
              {data.summary}
            </div>
          </div>

          {/* Key Factors */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              Faktor Penyebab Churn (Temuan)
            </h3>
            <div className="space-y-3">
              {data.keyFactors.map((factor, idx) => (
                <div key={idx} className="flex items-start gap-3 text-slate-800 bg-red-50 p-3 rounded-md border border-red-100">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-200 text-red-700 flex items-center justify-center text-xs font-bold mt-0.5">
                    !
                  </div>
                  <span className="text-sm font-semibold">{factor}</span>
                </div>
              ))}
              {data.keyFactors.length === 0 && (
                <div className="text-slate-500 italic text-sm p-4 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  Tidak ditemukan faktor risiko spesifik (PHK/Tutup/Pailit) dalam berita bulan ini.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar / Sources */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
              Sumber Berita (Verifikasi)
            </h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
              {data.sources.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <p className="text-xs font-bold text-slate-800 line-clamp-3 group-hover:text-blue-700 leading-snug mb-1">
                    {source.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium uppercase">
                     <span>Buka Artikel</span>
                     <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </a>
              ))}
              {data.sources.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">Tidak ada artikel relevan yang ditemukan.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;