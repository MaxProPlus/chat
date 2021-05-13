import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ConfigService} from '@nestjs/config'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  const configService = app.get(ConfigService)
  const options = new DocumentBuilder()
    .setTitle('Chat')
    .setDescription('The chat API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(configService.get<number>('port'))
}
bootstrap()
