import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthConfig } from './providers/auth-config';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthConfig, AuthService],
})
export class AuthModule {}
