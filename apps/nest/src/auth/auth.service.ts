import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email.toLowerCase());
    if (!user) throw new NotFoundException();

    const { password_hash, ...payload } = user;
    const passwordIsValid = await new Promise((resolve, reject) => {
      bcrypt.compare(password, password_hash, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });

    return passwordIsValid ? payload : null;
  }

  async login(user: User) {
    const { password_hash, ...payload } = user;
    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register({ email, password, name }) {
    const saltRounds = 10;
    const hash: string = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    const user = await this.usersService.createUser({
      email: email.toLowerCase(),
      password_hash: hash,
      name,
    });
    return this.login(user);
  }
}
