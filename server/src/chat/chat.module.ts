import {Module} from '@nestjs/common'
import {ChatService} from './chat.service'
import {ChatController} from './chat.controller'
import {MessageModule} from '../message/message.module'
import {MongooseModule} from '@nestjs/mongoose'
import {Chat, ChatSchema} from './schemas/chat.schema'
import {UserModule} from '../user/user.module'
import {ChatGateway} from './chat.gateway'
import {AuthModule} from '../auth/auth.module'

@Module({
  imports: [
    MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}]),
    MessageModule,
    UserModule,
    AuthModule,
  ],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
