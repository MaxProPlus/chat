import {Injectable} from '@nestjs/common'
import {CreateMessageDto} from './dto/create-message.dto'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {Message, MessageDocument} from './schemas/message.schema'
import {User, UserDocument} from '../user/schemas/user.schema'

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  // Send message
  async create(createMessageDto: CreateMessageDto) {
    const message = new this.messageModel(createMessageDto)
    await message.save()
    return message.populate('from', 'username').execPopulate()
  }

  async getMessageByChatId(chatId: string) {
    return await this.messageModel
      .find({chat: chatId} as any)
      .populate('to', 'username')
      .populate('from', 'username')
      .exec()
  }

  // async findAll(
  //   from: mongoose.Schema.Types.ObjectId,
  //   to: mongoose.Schema.Types.ObjectId
  // ) {
  //   const messages = await this.messageModel
  //     .find({
  //       $or: [
  //         {from: from, to: to},
  //         {from: to, to: from},
  //       ],
  //     })
  //     .populate('to', 'username')
  //     .populate('from', 'username')
  //     .exec()
  //   const user = await this.userModel.findById(to).select('username')
  //   return {
  //     username: user.username,
  //     messages,
  //   }
  // }
}
