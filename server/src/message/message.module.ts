import {Module} from '@nestjs/common'
import {MessageService} from './message.service'
import {MongooseModule} from '@nestjs/mongoose'
import {Message, MessageSchema} from './schemas/message.schema'
import {UserModule} from '../user/user.module'

@Module({
  imports: [
    MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),
    UserModule,
  ],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
