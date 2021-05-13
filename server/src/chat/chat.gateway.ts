import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import {Client, Server} from 'socket.io'
import {Message} from '../message/schemas/message.schema'
import {User} from '../user/schemas/user.schema'
import {AuthService} from '../auth/auth.service'

@WebSocketGateway(3002, {transports: ['polling'], path: '/ws'})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server

  constructor(private authService: AuthService) {}

  async handleConnection(client: Client) {
    try {
      const payload = this.authService.verifyToken(
        client.request._query.access_token.split(' ')[1]
      )
      this.server.sockets.connected[client.id].join(payload.id)
    } catch (e) {
      this.server.sockets.connected[client.id].disconnect()
    }
  }

  validateJwtAndDisconnect(userId: string) {
    const room = this.server.sockets.adapter.rooms[userId]
    if (room) {
      for (const key in room.sockets) {
        try {
          this.authService.verifyToken(
            this.server.sockets.connected[
              key
            ].handshake.query.access_token.split(' ')[1]
          )
        } catch (e) {
          this.server.sockets.connected[key].disconnect()
        }
      }
    }
  }

  sendPrivateMessage(data: Message) {
    this.validateJwtAndDisconnect('' + data.to)
    this.server
      .to('' + data.to)
      .emit('chat.private:' + (data.from as User).id, data)
  }

  // sendGroupMessage(data: Message) {
  //   this.server.to('chat.group:' + data.chat).emit('message', data)
  // }
}
