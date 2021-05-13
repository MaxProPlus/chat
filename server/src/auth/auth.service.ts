import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import {UserService} from '../user/user.service'
import {JwtService} from '@nestjs/jwt'
import {ResponseLoginDto} from './dto/response-login.dto'
import { JwtStrategy } from "./strategies/jwt.strategy";

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name)
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username)
    if (user && user.password === password) {
      return {
        id: user.id,
        username: user.username,
      }
    }
    throw new BadRequestException('Неверный логин или пароль')
  }

  verifyToken(access_token: string) {
    const payload = this.jwtService.verify(access_token)
    return this.jwtStrategy.validate(payload)
  }

  async login(user: any): Promise<ResponseLoginDto> {
    const payload = {
      sub: user.id,
      username: user.username,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
