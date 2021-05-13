import {ResponseJson} from './interfaces/responseJson'
import Routes_uri from 'routes/routes_uri'
import {history} from 'routes/history'
import {getAccessToken, getExp} from '../hooks/useToken'

class Api {
  post = (url: string, body: any) => {
    const token = this.getToken()
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
    return this._fetch(url, init)
  }

  postWithoutAuth = (url: string, body: any) => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
    return this._fetch(url, init)
  }

  protected get = (url: string) => {
    const token = this.getToken()
    const init = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    return this._fetch(url, init)
  }

  protected delete = (url: string) => {
    const token = this.getToken()
    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    return this._fetch(url, init)
  }

  private getToken = () => {
    const token = getAccessToken()
    if (!token) {
      history.replace(Routes_uri.LOGIN)
    }
    // todo refresh_token
    if (Date.now() + 5 > getExp() * 1000) {
      history.replace(Routes_uri.LOGIN)
    }
    return token
  }

  private _fetch = (url: string, init: RequestInit) => {
    return fetch(url, init)
      .then(
        (r) => {
          return r
            .json()
            .then((r) => r)
            .catch((err) => Promise.reject(r.statusText))
        },
        (err) => {
          // Нет связи с сервером
          return Promise.reject(err.message)
        }
      )
      .then((r: ResponseJson) => {
        if (r.statusCode >= 400) {
          return Promise.reject(r.message)
        }
        return r.results
      })
  }
}

export default Api
