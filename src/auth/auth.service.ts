import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return {
        status: false,
        message: 'User not found',
        data: null,
      };
    }
    if (!bcrypt.compare(pass, user?.password)) {
      return {
        status: false,
        message: 'Credensials not matching',
        data: null,
      };
      // throw new UnauthorizedException();
    }
    const payload = { username: user.firstname, sub: user.id };
    return {
      status: true,
      message: 'Login successfull',
      data: {
        access_token: await this.jwtService.signAsync(payload),
        userData: user,
      },
    };
  }

  async findOne(id: number) {
    return await this.usersService.getById(id);
  }
}
