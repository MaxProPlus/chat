import Api from '../api'

class ContactApi extends Api {
  getAll = () => {
    const url = '/api/contacts'
    return this.get(url)
  }
  add = (username: string) => {
    const url = '/api/contacts'
    return this.post(url, {username})
  }
  remove = (userId: string) => {
    const url = '/api/contacts/' + userId
    return this.delete(url)
  }
}

export default new ContactApi()
