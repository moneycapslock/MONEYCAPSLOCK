---
name: MONEYCAPSLOCK
description: Autonomous High-Volatility Risk Enforcement & Volume Spike Radar Agent for bankr.bot. Prevents REKT, enforces hard TP/SL, and monitors DEX volume spikes.
version: 1.0.0
author: MONEYCAPSLOCK
repository: https://github.com/moneycapslock/MONEYCAPSLOCK
entrypoint: dist/index.js
---

# 🚨 MONEYCAPSLOCK Skill Specification

MONEYCAPSLOCK is an autonomous risk enforcement guardrail and breakout radar agent designed for bankr.bot.

## Capabilities

1. **Risk Evaluation (`check`)**: Analyzes trade intent parameters (slippage, liquidity, price action) and enforces strict ALL-CAPS warnings if high-risk thresholds are breached.
2. **Volume Spike Radar (`radar`)**: Monitors real-time volume surges and whale transactions on DeFi protocols.
3. **Auto TP/SL Enforcement**: Automatically triggers profit-taking and hard stop-loss recommendations.

## Commands & Patterns

- `moneycapslock status`: Show agent status and active risk profiles.
- `moneycapslock check -s <SYMBOL>`: Perform instant risk evaluation on a token.
- `moneycapslock radar <enable|disable>`: Toggle real-time volume spike radar.
- `moneycapslock manifest`: Output skill configuration manifest.

## Environment & Execution

- **Node Engine**: `>=18.0.0`
- **Execution Script**: `npm start` or `node dist/index.js`
- **Memory File**: `/.memory/moneycapslock.json`
