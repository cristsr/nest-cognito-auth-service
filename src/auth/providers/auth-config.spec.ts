import { Test, TestingModule } from '@nestjs/testing';
import { AuthConfig } from './auth-config';

describe('AuthConfig', () => {
  let provider: AuthConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthConfig],
    }).compile();

    provider = module.get<AuthConfig>(AuthConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
