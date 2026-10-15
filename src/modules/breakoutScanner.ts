import { VolumeSpikeAlert } from '../types/index.js';
import { MoneyCapslockAgent } from '../agent/core.js';

export class BreakoutScanner {
  private agent: MoneyCapslockAgent;
  private isRunning: boolean = false;

  constructor(agent: MoneyCapslockAgent) {
    this.agent = agent;
  }

  public startScan(intervalMs: number = 60000): void {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log('🚨 [MONEYCAPSLOCK RADAR] BREAKOUT & WHALE SCANNER ACTIVATED.');
  }

  public stopScan(): void {
    this.isRunning = false;
    console.log('🛑 [MONEYCAPSLOCK RADAR] BREAKOUT SCANNER PAUSED.');
  }

  public evaluateVolumeSpike(
    symbol: string,
    tokenAddress: string,
    volumeSpikePct: number,
    volumeUsd: number,
    liquidityUsd: number
  ): VolumeSpikeAlert | null {
    // Threshold: Lonjakan volume >= 300% dengan volume minimal $50k
    if (volumeSpikePct >= 300 && volumeUsd >= 50000) {
      const alertMessage = this.agent.formatWhaleSpikeAlert(
        symbol,
        volumeSpikePct,
        volumeUsd,
        liquidityUsd
      );

      return {
        symbol: symbol.toUpperCase(),
        tokenAddress,
        volumeSpikePct,
        timeframeMinutes: 5,
        volumeUsd,
        liquidityUsd,
        alertMessage,
      };
    }

    return null;
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}
