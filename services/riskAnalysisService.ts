import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, RiskLevel, NewsSource } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCompanyRisk = async (companyName: string): Promise<AnalysisResult> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Get date range string for context - STRICT 1 MONTH
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    // Format tanggal untuk prompt agar AI paham batasan waktu
    const dateString = `${oneMonthAgo.getDate()} ${oneMonthAgo.toLocaleString('id-ID', { month: 'long' })} ${oneMonthAgo.getFullYear()} sampai ${today.getDate()} ${today.toLocaleString('id-ID', { month: 'long' })} ${today.getFullYear()}`;

    const prompt = `
      PERAN: Anda adalah Lead Analyst dari "Tim Churn Management". 
      TUGAS: Lakukan investigasi forensik berita untuk mendeteksi risiko klien berhenti berlangganan (Churn).
      
      TARGET PERUSAHAAN: "${companyName}"
      LOKASI: Indonesia
      RENTANG WAKTU DATA: ${dateString} (HANYA 1 BULAN TERAKHIR).
      
      INSTRUKSI PENCARIAN & ANALISIS:
      Gunakan Google Search untuk mencari berita *terkini* (dalam rentang waktu di atas). Abaikan berita lama.
      Fokuskan analisis HANYA pada sinyal-sinyal kebangkrutan/efisiensi berikut:
      
      1. KEUANGAN & LIKUIDITAS (High Impact):
         - Isu gagal bayar utang (Default).
         - Kerugian finansial besar di kuartal terakhir.
         - Penundaan pembayaran vendor/gaji (Indikator utama churn).
      
      2. EFISIENSI & RESTRUKTURISASI (High Impact):
         - PHK Massal (Layoffs) atau "Rightsizing".
         - Program Pensiun Dini (Early Retirement).
         - Merger atau Akuisisi (Biasanya menyebabkan pergantian vendor).
      
      3. OPERASIONAL (Medium-High Impact):
         - Penutupan Cabang/Gerai/Pabrik.
         - Penjualan aset perusahaan.
         - Mogok kerja karyawan.
      
      4. HUKUM (Critical Impact):
         - Status PKPU (Penundaan Kewajiban Pembayaran Utang).
         - Gugatan Pailit/Bangkrut.
         - Kasus korupsi manajemen level atas.

      FORMAT OUTPUT (WAJIB IKUTI):
      RISK_LEVEL: [LOW / MEDIUM / HIGH]
      SUMMARY: [Tulis 1 paragraf tajam. WAJIB sebutkan jika ada/tidak ada berita dalam 1 bulan terakhir. Jika ada PHK/Tutup Cabang, sebutkan jumlahnya.]
      FACTORS:
      - [Sebutkan isu spesifik 1]
      - [Sebutkan isu spesifik 2]
      
      LOGIKA PENILAIAN RISIKO:
      - HIGH: Ada berita PKPU, Pailit, PHK Massal, atau Tutup Cabang dalam 1 bulan terakhir. (REKOMENDASI: KUNJUNGAN SEGERA).
      - MEDIUM: Ada rumor efisiensi, penurunan laba, atau pergantian direksi. (REKOMENDASI: MONITOR).
      - LOW: Tidak ada berita negatif, atau ada berita ekspansi/untung. (REKOMENDASI: PERTAHANKAN).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    
    // Extract Grounding Metadata (Sources)
    const sources: NewsSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    chunks.forEach((chunk: any) => {
      if (chunk.web) {
        sources.push({
          title: chunk.web.title || "Sumber Berita Eksternal",
          uri: chunk.web.uri
        });
      }
    });

    // Parse Text Output
    const riskLevelMatch = text.match(/RISK_LEVEL:\s*(LOW|MEDIUM|HIGH)/i);
    const summaryMatch = text.match(/SUMMARY:([\s\S]*?)FACTORS:/i);
    const factorsMatch = text.match(/FACTORS:([\s\S]*)/i);

    let riskLevel = RiskLevel.UNKNOWN;
    if (riskLevelMatch) {
      const levelStr = riskLevelMatch[1].toUpperCase();
      if (levelStr === 'LOW') riskLevel = RiskLevel.LOW;
      if (levelStr === 'MEDIUM') riskLevel = RiskLevel.MEDIUM;
      if (levelStr === 'HIGH') riskLevel = RiskLevel.HIGH;
    }

    const summary = summaryMatch ? summaryMatch[1].trim() : "Tidak dapat menghasilkan ringkasan otomatis. Cek sumber berita manual.";
    
    const factorsRaw = factorsMatch ? factorsMatch[1].trim() : "";
    const keyFactors = factorsRaw
      .split('\n')
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(line => line.length > 0);

    return {
      companyName,
      riskLevel,
      summary,
      keyFactors,
      sources: sources,
      analyzedAt: new Date()
    };

  } catch (error) {
    console.error("Error analyzing company:", error);
    throw new Error("Gagal melakukan analisis. Pastikan koneksi internet stabil untuk Google Search.");
  }
};