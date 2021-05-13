import Api from '../api'
import {LoginUserDto} from '../../../../server/src/user/dto/login-user.dto'
import {CreateUserDto} from '../../../../server/src/user/dto/create-user.dto'

class UserApi extends Api {
  login = (user: LoginUserDto) => {
    const url = '/api/auth/login'
    return this.postWithoutAuth(url, user)
  }
  refreshToken = (refreshToken: string) => {
    const url = '/api/auth/refresh'
    return this.postWithoutAuth(url, refreshToken)
  }
  signup = (user: CreateUserDto) => {
    const url = '/api/users/signup'
    return this.postWithoutAuth(url, user)
  }
  getById = (id: string) => {
    const url = '/api/users/'+id
    return this.get(url)
  }
}

export default new UserApi()
