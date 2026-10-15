import * as fs from 'fs';
import * as path from 'path';
import { UserRiskProfile } from '../types/index.js';
import { CONFIG } from '../config/index.js';

export class BankrMemoryManager {
  private filePath: string;

  constructor(filePath?: string) {
    this.filePath = filePath || CONFIG.MEMORY_FILE_PATH;
    this.ensureMemoryDirectory();
  }

  private ensureMemoryDirectory(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  public loadProfile(): UserRiskProfile {
    try {
      if (fs.existsSync(this.filePath)) {
        const rawData = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(rawData) as UserRiskProfile;
      }
    } catch (error) {
      console.warn(`[${CONFIG.AGENT_NAME}] COULD NOT READ MEMORY FILE, USING DEFAULTS.`);
    }
    return CONFIG.DEFAULT_RISK_PROFILE;
  }

  public saveProfile(profile: UserRiskProfile): boolean {
    try {
      this.ensureMemoryDirectory();
      fs.writeFileSync(this.filePath, JSON.stringify(profile, null, 2), 'utf-8');
      return true;
    } catch (error) {
      console.error(`[${CONFIG.AGENT_NAME}] FAILED TO SAVE MEMORY STATE:`, error);
      return false;
    }
  }
}
