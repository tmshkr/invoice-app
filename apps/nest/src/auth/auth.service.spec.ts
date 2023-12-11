import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtSecret,
          signOptions: { expiresIn: '15m' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        UsersService,
        PrismaService,
      ],
      exports: [AuthService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const testUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
  };
  describe('register', () => {
    it('should register a new user and return an access_token', async () => {
      const result = await service.register(testUser);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('id');
      expect(result.email).toEqual(testUser.email.toLowerCase());
      expect(result.name).toEqual(testUser.name);
    });
  });

  describe('validateUser', () => {
    it('should validate that the user has the correct credentials', async () => {
      const result = await service.validateUser(
        testUser.email,
        testUser.password,
      );

      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result.email).toEqual(testUser.email.toLowerCase());
      expect(result.name).toEqual(testUser.name);
    });

    it('should return null when given incorrect credentials', async () => {
      const result = await service.validateUser(
        testUser.email,
        'wrong password',
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return the user payload with an access_token and without the password_hash', async () => {
      const user = await usersService.findOne(testUser.email.toLowerCase());
      const result = await service.login(user);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('access_token');
      expect(result.email).toEqual(testUser.email.toLowerCase());
      expect(result.name).toEqual(testUser.name);
      expect(result).not.toHaveProperty('password_hash');
    });
  });
});
