import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoggedUserDto } from './dto/loged-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<LoggedUserDto | null> {
    const user = await this.usersService.findForAuth(username);
    if (user && user.password) {
      const isMatch = await bcrypt.compare(pass, user.password);

      if (!isMatch) {
        return null;
      }

      delete user.password;
      return user;
    }

    return null;
  }

  async login({ username, id }: LoggedUserDto) {
    console.log('id', id);
    const payload = { username, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
