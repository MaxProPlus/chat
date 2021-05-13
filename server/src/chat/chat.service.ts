import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {Connection, Model} from 'mongoose'
import {InjectConnection, InjectModel} from '@nestjs/mongoose'
import {CreateMessageDto} from '../message/dto/create-message.dto'
import {Chat, ChatDocument} from './schemas/chat.schema'
import {User, UserDocument} from '../user/schemas/user.schema'
import {MessageService} from '../message/message.service'
import {ChatGateway} from './chat.gateway'

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
    private chatSocket: ChatGateway,
    private messageService: MessageService
  ) {}

  async sendMessageByUserId(message: CreateMessageDto) {
    let savedMessage
    const session = await this.connection.startSession()
    session.startTransaction()
    try {
      let chat = await this.chatModel.findOne({
        users: {
          $all: [message.from, message.to],
        },
      })
      if (!chat) {
        chat = await this.chatModel.create({
          users: [message.from, message.to],
        })
      }
      message.chat = chat.id
      savedMessage = await this.messageService.create(message)
      chat.lastMessage = savedMessage
      await chat.save()
      await session.commitTransaction()
      this.chatSocket.sendPrivateMessage(savedMessage)
    } catch (e) {
      await session.abortTransaction()
      throw e
    } finally {
      session.endSession()
    }
    return savedMessage
  }

  // async sendMessageByChatId(message: CreateMessageDto) {
  //   let savedMessage
  //   const session = await this.connection.startSession()
  //   session.startTransaction()
  //   try {
  //     const chat = await this.chatModel.findById(message.chat)
  //     if (!chat) {
  //       throw new BadRequestException('Чат не найден')
  //     }
  //     savedMessage = await this.messageService.create(message)
  //     chat.lastMessage = savedMessage
  //     await chat.save()
  //     await session.commitTransaction()
  //     this.chatSocket.sendGroupMessage(savedMessage)
  //   } catch (e) {
  //     await session.abortTransaction()
  //     throw e
  //   } finally {
  //     session.endSession()
  //   }
  //   return savedMessage
  // }

  async getMessagesByUserId(userId: string, toId: string) {
    const chat = await this.chatModel
      .findOne({
        users: {
          $all: [userId, toId],
        },
      })
      .select('users')
      .populate('users', 'username')
    if (!chat) {
      const user = await this.userModel.findById(toId)
      if (!user) {
        throw new BadRequestException('Пользователь не найден')
      }
      return {
        title: user.username,
        messages: [],
      }
    }
    const user = (chat.users as UserDocument[]).find((el) => userId !== el.id)
    return {
      title: user.username,
      messages: await this.messageService.getMessageByChatId(chat.id),
    }
  }

  // async getMessagesByChatId(userId: string, chatId: string) {
  //   const chat = await this.chatModel
  //     .findById(chatId)
  //     .select('users')
  //     .populate('users', 'username')
  //   if (!chat) {
  //     throw new NotFoundException('Чат не найден')
  //   }
  //   const user = (chat.users as UserDocument[]).find((el) => userId !== el.id)
  //   return {
  //     title: user.username,
  //     messages: await this.messageService.getMessageByChatId(chatId),
  //   }
  // }

  async getChatList(userId: string) {
    const chats = await this.chatModel
      .find({
        users: {
          $in: [userId],
        },
      })
      .select(['users', 'lastMessage'])
      .populate('users', 'username')
      .populate({
        path: 'lastMessage',
        select: ['body', 'from'],
        populate: {path: 'from', select: 'username'},
      })
    chats.forEach((el) => {
      const user = (el.users as UserDocument[]).find((el) => userId !== el.id)
      el.title = user.username
      el.to = user.id
    })
    return chats
  }
}
