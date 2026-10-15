import { describe, it, expect } from 'vitest';
import { RiskEngine } from '../src/agent/riskEngine.js';

describe('RiskEngine Core Logic Tests', () => {
  const riskEngine = new RiskEngine({
    maxSlippageAllowed: 3.0,
    maxTradeSizeUsd: 1000,
    autoTpPct: 50.0,
    hardSlPct: 10.0,
    capsEnforcementLevel: 'MAXIMUM_LOUD',
  });

  it('should pass a clean and low-risk trade', () => {
    const result = riskEngine.evaluateTrade({
      tokenAddress: '0x1234567890123456789012345678901234567890',
      symbol: 'ETH',
      amountUsd: 500,
      slippagePct: 0.5,
      liquidityUsd: 500000,
      priceChange1hPct: 2.5,
      rsi15m: 55,
    });

    expect(result.passed).toBe(true);
    expect(result.riskScore).toBe(0);
    expect(result.reasons.length).toBe(0);
    expect(result.enforcedCapsWarning).toContain('MONEYCAPSLOCK APPROVED');
  });

  it('should trigger ALL-CAPS warning for high slippage and low liquidity', () => {
    const result = riskEngine.evaluateTrade({
      tokenAddress: '0x9999999999999999999999999999999999999999',
      symbol: 'SHITCOIN',
      amountUsd: 200,
      slippagePct: 15.0, // High Slippage (+35 score)
      liquidityUsd: 5000, // Very Low Liquidity (+40 score)
      priceChange1hPct: 200, // Parabolic Pump (+30 score)
      rsi15m: 88, // Overbought (+20 score)
    });

    expect(result.passed).toBe(false);
    expect(result.riskScore).toBeGreaterThanOrEqual(50);
    expect(result.reasons.length).toBeGreaterThan(0);
    expect(result.enforcedCapsWarning).toContain('MONEYCAPSLOCK ENFORCEMENT INTERVENTION');
  });
});
