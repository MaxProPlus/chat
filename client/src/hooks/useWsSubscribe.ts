import io from 'socket.io-client'
import {getAccessToken, getUserId} from './useToken'
import {store} from 'redux/store'
import {addMessage} from 'redux/chatSlice'

let socket: SocketIOClient.Socket

export const subscribePrivateChat = (userId: string) => {
  const token = getAccessToken()
  if (!token) return null

  socket = io('http://localhost:3002', {
    path: '/ws',
    transports: ['polling'],
    query: {
      access_token: 'Bearer ' + token,
    },
  })

  socket.on('chat.private:' + userId, (data: any) => {
    console.log('socket.message', data)
    store.dispatch(addMessage(data))
    console.log('message: ', data)
  })
}

export const subscribeGroupChat = (idChat: string) => {
  const token = getAccessToken()
  const userId = getUserId()
  if (!token || !userId) return null

  socket = io('http://localhost:3002', {
    path: '/ws',
    transports: ['polling'],
    query: {
      access_token: 'Bearer ' + token,
    },
  })

  socket.on('message:' + userId, (data: any) => {
    console.log('socket.message', data)
    store.dispatch(addMessage(data))
    console.log('message: ', data)
  })
  socket.on('connect', () => {
    console.log('Connected')
  })
  socket.on('error', () => {
  })
  socket.on('exception', function (data: any) {
  })

}

export const unSubscribe = () => {
  socket.disconnect()
  // socket.close()
}

export const sendMessage = () => {}

export default function useWsSubscribe() {}
