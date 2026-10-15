#!/usr/bin/env node

import { Command } from 'commander';
import { MoneyCapslockAgent } from './agent/core.js';
import { RiskEngine } from './agent/riskEngine.js';
import { BreakoutScanner } from './modules/breakoutScanner.js';
import { BankrMemoryManager } from './bankr/memory.js';
import { MONEYCAPSLOCK_MANIFEST } from './bankr/manifest.ts';
import { CONFIG } from './config/index.js';

const program = new Command();
const agent = new MoneyCapslockAgent();
const memoryManager = new BankrMemoryManager();
const scanner = new BreakoutScanner(agent);

program
  .name('moneycapslock')
  .description('Autonomous High-Volatility Risk Enforcement & Volume Spike Radar Agent for bankr.bot')
  .version(CONFIG.VERSION);

// Command 1: Status Check
program
  .command('status')
  .description('Show MONEYCAPSLOCK agent active status and risk profile')
  .action(() => {
    const profile = memoryManager.loadProfile();
    console.log(`\n${agent.getStatus()}`);
    console.log('--------------------------------------------------');
    console.log(`• MAX SLIPPAGE ALLOWED : ${profile.maxSlippageAllowed}%`);
    console.log(`• MAX TRADE SIZE (USD) : $${profile.maxTradeSizeUsd}`);
    console.log(`• HARD STOP-LOSS       : -${profile.hardSlPct}%`);
    console.log(`• AUTO TAKE-PROFIT     : +${profile.autoTpPct}%`);
    console.log(`• ENFORCEMENT LEVEL    : ${profile.capsEnforcementLevel}`);
    console.log('--------------------------------------------------\n');
  });

// Command 2: Risk Check
program
  .command('check')
  .description('Evaluate risk for a specific token trade parameters')
  .requiredOption('-s, --symbol <symbol>', 'Token Symbol (e.g., ETH, BASE)')
  .option('-a, --address <address>', 'Token Contract Address', '0x0000000000000000000000000000000000000000')
  .option('-p, --price-change <pct>', '1-hour price change percentage', '0')
  .option('-l, --liquidity <usd>', 'Liquidity in USD', '100000')
  .option('--slippage <pct>', 'Trade slippage percentage', '1.0')
  .action((options) => {
    const riskEngine = new RiskEngine(memoryManager.loadProfile());
    const result = riskEngine.evaluateTrade({
      symbol: options.symbol,
      tokenAddress: options.address,
      amountUsd: 100,
      slippagePct: parseFloat(options.slippage),
      liquidityUsd: parseFloat(options.liquidity),
      priceChange1hPct: parseFloat(options.priceChange),
    });

    console.log('\n' + result.enforcedCapsWarning + '\n');
  });

// Command 3: Radar Control
program
  .command('radar')
  .description('Control real-time breakout & volume spike radar')
  .argument('<action>', 'enable or disable')
  .action((action) => {
    if (action === 'enable') {
      scanner.startScan();
    } else if (action === 'disable') {
      scanner.stopScan();
    } else {
      console.log('INVALID ACTION. USE "enable" OR "disable".');
    }
  });

// Command 4: Manifest Print
program
  .command('manifest')
  .description('Output Bankr Skill Manifest')
  .action(() => {
    console.log(JSON.stringify(MONEYCAPSLOCK_MANIFEST, null, 2));
  });

program.parse(process.argv);
