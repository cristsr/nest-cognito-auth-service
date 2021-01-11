import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from '../../constants';

@Injectable()
export class AuthConfig {
  public userPoolId: string = this.config.get(CONFIG.COGNITO_USER_POOL_ID);
  public clientId: string = this.config.get(CONFIG.COGNITO_CLIENT_ID);
  public region: string = this.config.get(CONFIG.COGNITO_REGION);
  public authority = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}`;

  constructor(private config: ConfigService) {}
}
