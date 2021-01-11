import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() authenticateRequest: any) {
    return this.authService.authenticate(authenticateRequest);
  }

  @Post('change-password')
  async changePassword(@Body() authenticateRequest: any) {
    return this.authService.changePassword(authenticateRequest);
  }
}
