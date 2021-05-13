import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {AuthModule} from './auth/auth.module'
import {UserModule} from './user/user.module'
import {ConfigModule, ConfigService} from '@nestjs/config'
import configuration from './config/configuration'
import {MongooseModule} from '@nestjs/mongoose'
import {MessageModule} from './message/message.module'
import {ContactModule} from './contact/contact.module'
import {ServeStaticModule} from '@nestjs/serve-static'
import {ChatModule} from './chat/chat.module'
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../client/build'),
    }),
    AuthModule,
    UserModule,
    MessageModule,
    ContactModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
