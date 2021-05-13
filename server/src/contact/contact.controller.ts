import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import {ContactService} from './contact.service'
import {JwtAuthGuard} from '../auth/guards/jwt.guard'
import {User as UserDecorator} from '../user/user.decorator'
import {UserDocument} from '../user/schemas/user.schema'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

@ApiTags('contacts')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorized'})
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({summary: 'Add a contact'})
  @ApiCreatedResponse({description: 'Added a contact'})
  @Post()
  @UseGuards(JwtAuthGuard)
  async add(
    @UserDecorator() user: UserDocument,
    @Body('username') username: string
  ) {
    if (user.username === username) {
      throw new BadRequestException('Нельзя добавить самого себя')
    }
    await this.contactService.add(user.id, username)
    return {
      statusCode: HttpStatus.CREATED,
    }
  }

  @ApiOperation({summary: 'Contact list'})
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@UserDecorator() user: UserDocument) {
    return {
      statusCode: HttpStatus.OK,
      results: await this.contactService.findAll(user.id),
    }
  }

  @ApiOperation({summary: 'Delete a contact'})
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@UserDecorator() user: UserDocument, @Param('id') id: string) {
    await this.contactService.remove(user.id, id)
    return {
      statusCode: HttpStatus.OK,
    }
  }
}
