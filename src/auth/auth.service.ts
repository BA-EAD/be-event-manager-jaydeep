import { Injectable } from '@nestjs/common';
import { UsersService } from '../api/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && user.password === password) {
      const { email, password, ...rest } = user;
      return user;
    }
    return false;
  }

  async login(user) {
    const { email, password } = user;

    const item: any = await this.validateUser(email, password);
    if (item && item._id) {
      const payLoad = {
        id: item?._id,
        email: item?.email,
        mobile: item?.mobile || '',
        full_name: item?.full_name || '',
      };

      return {
        user: item,
        access_token: this.jwtService.sign(payLoad),
      };
    } else {
      return false;
    }
  }
}
