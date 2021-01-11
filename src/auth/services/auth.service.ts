import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthConfig } from '../providers/auth-config';

@Injectable()
export class AuthService {
  private readonly userPool: CognitoUserPool;

  constructor(private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  authenticate(user: { name: string; password: string }) {
    const { name, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });

    const userData = {
      Username: name,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(new BadRequestException(err.message));
        },
        newPasswordRequired: (userAttributes) => {
          delete userAttributes.email_verified;
          return userAttributes;
          // reject(
          //   new UnprocessableEntityException(
          //     'Please change your current password',
          //   ),
          // );
        },
      });
    });
  }

  changePassword(user) {
    const { name, password, newPassword } = user;

    // const cognitoUserSession = await;

    const cognitoUser = new CognitoUser({
      Username: name,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.changePassword(password, newPassword, (err, success) => {
        if (err) reject(new BadRequestException(err.message));
        resolve(success);
      });
    });
  }
}
