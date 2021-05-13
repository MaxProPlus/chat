import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import {Document} from 'mongoose'
import {UserDocument} from '../../user/schemas/user.schema'
import {ChatDocument} from '../../chat/schemas/chat.schema'

export type MessageDocument = Message & Document

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id
    },
  },
})
export class Message {
  @Prop({
    required: true,
  })
  body: string // текст сообщения

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
  })
  chat: mongoose.Schema.Types.ObjectId | ChatDocument

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  from: mongoose.Schema.Types.ObjectId | UserDocument // от кого

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  to: mongoose.Schema.Types.ObjectId | UserDocument // кому
}

export const MessageSchema = SchemaFactory.createForClass(Message)
