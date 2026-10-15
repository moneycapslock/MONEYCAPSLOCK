import { RiskEngine } from './riskEngine.js';
import { RiskCheckParams, RiskEvaluationResult } from '../types/index.js';
import { CONFIG } from '../config/index.js';

export class MoneyCapslockAgent {
  private riskEngine: RiskEngine;

  constructor() {
    this.riskEngine = new RiskEngine();
  }

  public async handleTradeIntent(tradeDetails: RiskCheckParams): Promise<RiskEvaluationResult> {
    console.log(`[${CONFIG.AGENT_NAME}] ANALYZING TRADE INTENT FOR $${tradeDetails.symbol.toUpperCase()}...`);
    return this.riskEngine.evaluateTrade(tradeDetails);
  }

  public formatWhaleSpikeAlert(
    symbol: string,
    spikePct: number,
    volumeUsd: number,
    liquidityUsd: number
  ): string {
    return (
      `📢 [MONEYCAPSLOCK VOLATILITY RADAR]\n` +
      `🚨 $${symbol.toUpperCase()} VOLUME EXPLOSION DETECTED!\n` +
      `⚡ SURGE: +${spikePct}% IN 5 MINUTES\n` +
      `💰 VOLUME: $${volumeUsd.toLocaleString()}\n` +
      `💧 LIQUIDITY: $${liquidityUsd.toLocaleString()}\n` +
      `DIRECT ROUTE AVAILABLE ON BANKR TERMINAL!`
    );
  }

  public getStatus(): string {
    return `⚡ ${CONFIG.AGENT_NAME} v${CONFIG.VERSION} IS ONLINE AND PROTECTING YOUR PORTFOLIO. CAPS LOCK IS ON.`;
  }
}
