import UserApi from './user'

describe('UserApi', () => {
  test('refreshToken', async () => {
    return UserApi.refreshToken('123').then(r=>{
      console.log(r)
    }, err => {
      console.dir(err)
    })
  })
})