import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG } from './constants';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
})
export class AppModule {
  static port: number;

  constructor(private config: ConfigService) {
    AppModule.port = +config.get(CONFIG.APP_PORT);
  }
}
