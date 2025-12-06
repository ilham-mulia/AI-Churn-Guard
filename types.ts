export enum RiskLevel {
  LOW = 'RENDAH',
  MEDIUM = 'SEDANG',
  HIGH = 'TINGGI',
  UNKNOWN = 'TIDAK DIKETAHUI'
}

export interface NewsSource {
  title: string;
  uri: string;
}

export interface AnalysisResult {
  companyName: string;
  riskLevel: RiskLevel;
  summary: string;
  keyFactors: string[];
  sources: NewsSource[];
  analyzedAt: Date;
}

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  data: AnalysisResult | null;
}