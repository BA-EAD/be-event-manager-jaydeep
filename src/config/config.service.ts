import { Injectable, Inject } from '@nestjs/common';

export const ENV_VARS = 'ENV_VARS';

export interface AppConfig {
  MONGODB_URI?: string;
  IS_DEPLOYED_ENV?: string;
  SYNCHRONIZE?: string;
  IS_TESTING_ENABLED?: string;
}

@Injectable()
export class ConfigService {
  constructor(@Inject(ENV_VARS) private envVars: AppConfig = {}) {}

  get(key: keyof AppConfig): string | undefined {
    console.log(this.envVars[key], key);
    return this.envVars[key] ?? process.env[key];
  }

  getStrict(key: keyof AppConfig): string {
    const value = this.get(key);
    if (value == null) throw new Error(`"${key}" env variable is not set`);
    return value;
  }

  isDeployedEnv(): boolean {
    return this.get('IS_DEPLOYED_ENV') === 'true';
  }

  isTestingEnabled(): boolean {
    return this.get('IS_TESTING_ENABLED') === 'true';
  }
}
