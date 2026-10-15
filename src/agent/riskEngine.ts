import { RiskCheckParams, RiskEvaluationResult, UserRiskProfile } from '../types/index.js';

export class RiskEngine {
  private profile: UserRiskProfile;

  constructor(profile?: Partial<UserRiskProfile>) {
    this.profile = {
      maxSlippageAllowed: profile?.maxSlippageAllowed ?? 3.0,
      maxTradeSizeUsd: profile?.maxTradeSizeUsd ?? 1000,
      autoTpPct: profile?.autoTpPct ?? 50.0,
      hardSlPct: profile?.hardSlPct ?? 10.0,
      capsEnforcementLevel: profile?.capsEnforcementLevel ?? 'MAXIMUM_LOUD',
    };
  }

  public evaluateTrade(params: RiskCheckParams): RiskEvaluationResult {
    const reasons: string[] = [];
    let riskScore = 0;

    // 1. High Slippage Check
    if (params.slippagePct > this.profile.maxSlippageAllowed) {
      riskScore += 35;
      reasons.push(`SLIPPAGE IS INSANE (${params.slippagePct}% > LIMIT ${this.profile.maxSlippageAllowed}%)`);
    }

    // 2. Low Liquidity Check
    if (params.liquidityUsd < 25000) {
      riskScore += 40;
      reasons.push(`EXTREMELY LOW LIQUIDITY ($${params.liquidityUsd.toLocaleString()}). HIGH REKT RISK!`);
    }

    // 3. Parabolic Surge / Local Top Warning
    if (params.priceChange1hPct >= 150) {
      riskScore += 30;
      reasons.push(`TOKEN PUMPED +${params.priceChange1hPct}% IN 1 HOUR. HIGH RISK OF LOCAL TOP!`);
    }

    // 4. Overbought RSI
    if (params.rsi15m && params.rsi15m > 80) {
      riskScore += 20;
      reasons.push(`15M RSI IS HYPER OVERBOUGHT (${params.rsi15m})`);
    }

    const passed = riskScore < 50;
    const enforcedCapsWarning = this.generateCapsWarning(params, riskScore, reasons);

    return {
      passed,
      riskScore,
      reasons,
      enforcedCapsWarning,
    };
  }

  private generateCapsWarning(params: RiskCheckParams, score: number, reasons: string[]): string {
    if (score === 0) {
      return `🟢 [MONEYCAPSLOCK APPROVED]: $${params.symbol} TRADE MEETS DISCIPLINE PARAMETERS. EXECUTE SAFELY!`;
    }

    if (score < 50) {
      return `⚠️ [MONEYCAPSLOCK CAUTION]: MODERATE RISK DETECTED FOR $${params.symbol} (SCORE: ${score}/100).\n` +
             reasons.map(r => `• ${r}`).join('\n');
    }

    return `🚨🚨 [MONEYCAPSLOCK ENFORCEMENT INTERVENTION] 🚨🚨\n` +
           `STOP! YOU ARE ABOUT TO GET REKT ON $${params.symbol}!\n` +
           `RISK SCORE: ${score}/100 [CRITICAL]\n` +
           `REASONS FOR INTERVENTION:\n` +
           reasons.map(r => `➔ ${r}`).join('\n') + `\n\n` +
           `TYPE 'CONFIRM CAPS' IN BANKR TERMINAL TO OVERRIDE AT YOUR OWN RISK!`;
  }
}
