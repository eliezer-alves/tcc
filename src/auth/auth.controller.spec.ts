import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  const authService = { login: () => {} };
  let authController: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should be a correct class instance', () => {
    expect(authController).toBeInstanceOf(AuthController);
  });

  it('should be a correct return when loged successful', () => {
    const expectedResult = { access_token: 'access_token' };
    const requestBody = { email: 'email@email.com', password: '123' };

    jest
      .spyOn(authService, 'login')
      .mockImplementation(() => Promise.resolve(expectedResult));

    expect(authController.login(requestBody)).resolves.toEqual(expectedResult);
  });
});
