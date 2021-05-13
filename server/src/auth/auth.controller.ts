import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LocalAuthGuard} from './guards/local.guard'
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger'
import {LoginUserDto} from '../user/dto/login-user.dto'
import {ResponseDto} from '../core/dto/response.types'
import {ResponseLoginDto} from './dto/response-login.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Login'})
  @ApiParam({
    name: 'login',
    type: LoginUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad username or password',
  })
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<ResponseDto<ResponseLoginDto>> {
    return this.authService.login(req.user).then((r) => ({
      statusCode: HttpStatus.OK,
      results: r,
    }))
  }
}
