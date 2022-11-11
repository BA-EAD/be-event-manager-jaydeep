import * as dotenv from 'dotenv';
import { DynamicModule } from '@nestjs/common';
// import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { ConfigService, ENV_VARS, AppConfig } from './config.service';

export class ConfigModule {
  static async forRootAsync(): Promise<DynamicModule> {
    let secrets: AppConfig;

    return {
      global: true,
      module: ConfigModule,
      providers: [
        {
          provide: ENV_VARS,
          useValue: secrets,
        },
        ConfigService,
      ],
      exports: [
        ConfigService,
        {
          provide: ENV_VARS,
          useValue: secrets,
        },
      ],
    };
  }
}
