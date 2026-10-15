import dotenv from 'dotenv';
import { UserRiskProfile } from '../types/index.js';

dotenv.config();

export const DEFAULT_RISK_PROFILE: UserRiskProfile = {
  maxSlippageAllowed: Number(process.env.MAX_SLIPPAGE_PCT) || 3.0,
  maxTradeSizeUsd: Number(process.env.MAX_TRADE_SIZE_USD) || 1000,
  autoTpPct: Number(process.env.AUTO_TP_PCT) || 50.0,
  hardSlPct: Number(process.env.HARD_SL_PCT) || 10.0,
  capsEnforcementLevel: (process.env.CAPS_LEVEL as UserRiskProfile['capsEnforcementLevel']) || 'MAXIMUM_LOUD',
};

export const CONFIG = {
  AGENT_NAME: 'MONEYCAPSLOCK',
  VERSION: '1.0.0',
  X_ACCOUNT: 'https://x.com/moneycapslock',
  GITHUB_REPO: 'https://github.com/moneycapslock/MONEYCAPSLOCK',
  MEMORY_FILE_PATH: './.memory/moneycapslock.json',
  DEFAULT_RISK_PROFILE,
};
