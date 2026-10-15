<div align="center">

<img src="https://pbs.twimg.com/profile_images/2110759562005684224/QlN9W4yR_400x400.jpg" width="140" height="140" style="border-radius: 50%" alt="MONEYCAPSLOCK Logo"/>

# 🚨 MONEYCAPSLOCK

**Autonomous High-Volatility Risk Enforcement & Volume Spike Radar Agent Skill for [bankr.bot](https://bankr.bot)**

[![X Follow](https://img.shields.io/twitter/follow/moneycapslock?style=social)](https://x.com/moneycapslock)
[![GitHub License](https://img.shields.io/github/license/moneycapslock/MONEYCAPSLOCK)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![CI Status](https://github.com/moneycapslock/MONEYCAPSLOCK/actions/workflows/ci.yml/badge.svg)](https://github.com/moneycapslock/MONEYCAPSLOCK/actions)
[![Bankr Skill](https://img.shields.io/badge/Bankr_Skill-Ready-neon?color=00ffcc)](https://bankr.bot)

*NO REKT. NO FOMO. HARD SL & AUTO-TP ENFORCED. ALL CAPS, ALL ALPHA.*

</div>

---

## ⚡ Overview

**MONEYCAPSLOCK** is an autonomous risk management guardrail and high-volatility radar agent built specifically for the **[bankr.bot](https://bankr.bot)** ecosystem. Operating with an uncompromising, ALL-CAPS communication style, it actively intercepts dangerous swaps, prevents local-top FOMO buys, monitors whale volume spikes on Base & Robinhood Chain, and enforces strict Take-Profit (TP) & Stop-Loss (SL) discipline.

---

## 🚀 Key Features

* **🚨 CAPS-LOCK Risk Enforcement**: Intercepts high-slippage (>3%), low-liquidity ($<25k), and hyper-overbought trades before execution.
* **📢 Real-Time Breakout Radar**: Scans DEX volume spikes (>300% in 5m) and alerts the user directly in the Bankr terminal.
* **💰 Automated TP/SL Guard**: Auto-enforces profit taking when targets hit (+50%, +100%) and sets hard stop-losses to protect capital.
* **⚡ Native bankr.bot Integration**: Persists settings in `/.memory/moneycapslock.json` and supports x402 micro-payment execution routines.

---

## 🛠️ Quick Installation & Setup

### Option 1: Via Bankr CLI / Terminal
Inside your **bankr.bot** CLI or Web Workspace:

```bash
bankr skill install @moneycapslock/core

Option 2: Local Development
Clone and install dependencies:
git clone [https://github.com/moneycapslock/MONEYCAPSLOCK.git](https://github.com/moneycapslock/MONEYCAPSLOCK.git)
cd MONEYCAPSLOCK
npm install
npm run build

💻 Usage & Commands
| Command | Action |
|---|---|
| moneycapslock status | View active risk parameters and agent status |
| moneycapslock check -s <SYMBOL> | Run instant risk check on a token symbol/address |
| moneycapslock radar enable | Turn on background volume spike & whale alerts |
| moneycapslock manifest | Output Bankr Skill Manifest JSON |
Example CLI Output:
🚨🚨 [MONEYCAPSLOCK ENFORCEMENT INTERVENTION] 🚨🚨
STOP! YOU ARE ABOUT TO GET REKT ON $SHITCOIN!
RISK SCORE: 75/100 [CRITICAL]
REASONS FOR INTERVENTION:
➔ SLIPPAGE IS INSANE (15% > LIMIT 3%)
➔ EXTREMELY LOW LIQUIDITY ($5,000). HIGH REKT RISK!

TYPE 'CONFIRM CAPS' IN BANKR TERMINAL TO OVERRIDE AT YOUR OWN RISK!

🏛️ Architecture
[User / Bankr CLI] ──> [Natural Language Intent]
                             │
                             ▼
                [MONEYCAPSLOCK Skill Engine]
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   [RiskEngine (Anti-REKT)]      [BreakoutScanner (Vol Radar)]
            │                                 │
            ▼                                 ▼
   [CAPS Warning / Intercept]    [Whale Alerts & x402 Route]

🧪 Testing
Run automated unit tests powered by Vitest:
npm run test

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🔗 Official Links
 * X (Twitter): @moneycapslock
 * GitHub: github.com/moneycapslock/MONEYCAPSLOCK
<div align="center">
<sub>Built with high-frequency urgency for the bankr.bot Agent Economy.</sub>
</div>

---
