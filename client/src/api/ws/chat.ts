import socket from 'socket.io-client'
class ChatWs {
  subscribe() {
    let wtf = socket.connect({
      path: '/ws',
      port: '3002',
    })
    console.log(wtf)
  }
}

export default new ChatWs()
