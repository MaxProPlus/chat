import Api from '../api'

class ChatApi extends Api{
  sendMessageByChatId = (chatId: string, body: string) => {
    const url = '/api/chats/'+chatId
    return this.post(url, {body})
  }
  sendMessageByUserId = (to: string, body: string) => {
    const url = '/api/chats/0?to=' + to
    return this.post(url, {body})
  }
  getAll = () => {
    const url = '/api/chats'
    return this.get(url)
  }
  getMessageByChatId = (chatId: string) => {
    const url = '/api/chats/' + chatId
    return this.get(url)
  }
  getMessageByUserId = (to: string) => {
    const url = '/api/chats/0?to=' + to
    return this.get(url)
  }
}

export default new ChatApi()