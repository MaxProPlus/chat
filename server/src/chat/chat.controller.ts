import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import {User as UserDecorator} from '../user/user.decorator'
import {JwtUserDto} from '../user/dto/jwt-user.dto'
import {MessageValidator} from '../message/validator/message.pipe'
import {CreateMessageDto} from '../message/dto/create-message.dto'
import {ChatService} from './chat.service'
import {JwtAuthGuard} from '../auth/guards/jwt.guard'
import * as mongoose from 'mongoose'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

@Controller('chats')
@ApiTags('chats')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorized'})
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post(':chatId')
  @ApiOperation({summary: 'Send message by user id'})
  @ApiParam({name: 'to', description: 'User id'})
  @ApiCreatedResponse({
    description: 'Successful sent',
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
  })
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @UserDecorator() user: JwtUserDto,
    @Body(MessageValidator) createMessageDto: CreateMessageDto,
    @Query('to') to: string
  ) {
    createMessageDto.from = user.id
    createMessageDto.to = to
    // todo Вынести валидацию
    if (!mongoose.Types.ObjectId.isValid(createMessageDto.to)) {
      throw new BadRequestException(
        'поле to не соответствует ObjectId',
        'Ошибка валидации'
      )
    }
    if (createMessageDto.from === createMessageDto.to) {
      throw new BadRequestException(
        'Нельзя написать самому себе',
        'Нельзя написать самому себе'
      )
    }
    return {
      statusCode: HttpStatus.CREATED,
      results: await this.chatService.sendMessageByUserId(createMessageDto),
    }
  }

  @Get(':chatId')
  @ApiOperation({description: 'Get messages by user id'})
  @ApiCreatedResponse({
    description: 'Successful get messages',
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
  })
  @UseGuards(JwtAuthGuard)
  async getMessages(
    @UserDecorator() user: JwtUserDto,
    @Query('to') to: string
  ) {
    // todo Вынести валидацию
    if (!mongoose.Types.ObjectId.isValid(to)) {
      throw new BadRequestException(
        'поле to не соответствует ObjectId',
        'Ошибка валидации'
      )
    }
    return {
      statusCode: HttpStatus.OK,
      results: await this.chatService.getMessagesByUserId(user.id, to),
    }
  }

  @Get('')
  @ApiOperation({summary: 'Get chat list'})
  @ApiCreatedResponse({
    description: 'Successful get chat list',
  })
  @UseGuards(JwtAuthGuard)
  async getChatList(@UserDecorator() user: JwtUserDto) {
    return {
      statusCode: HttpStatus.OK,
      results: await this.chatService.getChatList(user.id),
    }
  }
}
