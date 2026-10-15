import { UserRiskProfile } from '../types/index.js';
import { CONFIG } from '../config/index.js';

export interface PositionStatus {
  symbol: string;
  entryPriceUsd: number;
  currentPriceUsd: number;
  unrealizedPnlPct: number;
}

export class AutoTpSlEnforcer {
  private profile: UserRiskProfile;

  constructor(profile?: UserRiskProfile) {
    this.profile = profile || CONFIG.DEFAULT_RISK_PROFILE;
  }

  public checkPosition(position: PositionStatus): string | null {
    const { symbol, unrealizedPnlPct } = position;

    // 1. Trigger Hard Stop-Loss
    if (unrealizedPnlPct <= -this.profile.hardSlPct) {
      return (
        `🚨 [MONEYCAPSLOCK STOP-LOSS INTERVENTION] 🚨\n` +
        `YOUR $${symbol.toUpperCase()} POSITION IS DOWN ${unrealizedPnlPct.toFixed(2)}%!\n` +
        `HARD SL THRESHOLD (-${this.profile.hardSlPct}%) BREACHED!\n` +
        `RECOMMENDATION: CLOSE POSITION NOW TO PROTECT REMAINING CAPITAL!`
      );
    }

    // 2. Trigger Take-Profit Enforcement
    if (unrealizedPnlPct >= this.profile.autoTpPct) {
      return (
        `💰 [MONEYCAPSLOCK PROFIT-TAKING ENFORCEMENT] 💰\n` +
        `YOUR $${symbol.toUpperCase()} POSITION IS UP +${unrealizedPnlPct.toFixed(2)}%!\n` +
        `TARGET PROFIT (+${this.profile.autoTpPct}%) REACHED!\n` +
        `RECOMMENDATION: SWAP 30%-50% BACK TO USDC TO LOCK IN GAINS!`
      );
    }

    return null;
  }
}
