import { BankrSkillManifest } from '../types/index.js';
import { CONFIG } from '../config/index.js';

export const MONEYCAPSLOCK_MANIFEST: BankrSkillManifest = {
  name: CONFIG.AGENT_NAME,
  version: CONFIG.VERSION,
  description: 'Autonomous High-Volatility Risk Enforcement & Volume Spike Radar Agent for bankr.bot',
  author: 'MONEYCAPSLOCK Team',
  commands: [
    {
      name: 'check',
      description: 'Analyze trading risk for a specific token contract or symbol',
      pattern: 'moneycapslock check <symbol_or_address>',
    },
    {
      name: 'radar',
      description: 'Enable or disable real-time volume spike and whale alert radar',
      pattern: 'moneycapslock radar <enable|disable>',
    },
    {
      name: 'set-risk',
      description: 'Set maximum slippage or trade limits to protect portfolio',
      pattern: 'moneycapslock set-risk <maxSlippage> <maxTradeSizeUsd>',
    },
    {
      name: 'status',
      description: 'Check MONEYCAPSLOCK active status and current risk profile',
      pattern: 'moneycapslock status',
    },
  ],
};
