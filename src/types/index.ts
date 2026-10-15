export interface RiskCheckParams {
  tokenAddress: string;
  symbol: string;
  amountUsd: number;
  slippagePct: number;
  liquidityUsd: number;
  rsi15m?: number;
  priceChange1hPct: number;
}

export interface RiskEvaluationResult {
  passed: boolean;
  riskScore: number; // Scale 0 - 100 (Higher means critical risk)
  reasons: string[];
  enforcedCapsWarning: string;
}

export interface VolumeSpikeAlert {
  symbol: string;
  tokenAddress: string;
  volumeSpikePct: number;
  timeframeMinutes: number;
  volumeUsd: number;
  liquidityUsd: number;
  alertMessage: string;
}

export interface UserRiskProfile {
  maxSlippageAllowed: number;
  maxTradeSizeUsd: number;
  autoTpPct: number;
  hardSlPct: number;
  capsEnforcementLevel: 'STRICT' | 'AGGRESSIVE' | 'MAXIMUM_LOUD';
}

export interface BankrSkillManifest {
  name: string;
  version: string;
  description: string;
  author: string;
  commands: {
    name: string;
    description: string;
    pattern: string;
  }[];
}
