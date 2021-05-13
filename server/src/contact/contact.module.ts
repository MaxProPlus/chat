import {Module} from '@nestjs/common'
import {ContactService} from './contact.service'
import {ContactController} from './contact.controller'
import {UserModule} from '../user/user.module'

@Module({
  imports: [UserModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
