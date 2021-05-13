import {Body, Controller, HttpStatus, Post} from '@nestjs/common'
import {UserService} from './user.service'
import {CreateUserDto} from './dto/create-user.dto'
import {UserValidator} from './validator/user.pipe'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @ApiOperation({summary: 'Sign up'})
  @ApiCreatedResponse({description: 'Successful Sign up'})
  @ApiBadRequestResponse({description: 'Validation error'})
  async signup(@Body(UserValidator) createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto)
    return {
      statusCode: HttpStatus.CREATED,
    }
  }
}
