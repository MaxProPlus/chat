import {useState} from 'react'

export type Token = {
  access_token: string
}

export const getPlainToken = () => {
  return localStorage.getItem('token')
}
export const getToken = () => {
  const token = localStorage.getItem('token')
  return token ? JSON.parse(token) : null
}
export const getAccessToken = () => {
  const token = getToken()
  return token ? token.access_token : null
}
export const getUserId = () => {
  const token = getAccessToken()
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).sub
}
export const getExp = () => {
  const access_token = getAccessToken()
  if (access_token) {
    return JSON.parse(atob(access_token.split('.')[1])).exp
  }
  return null
}
export const clearToken = () => {
  localStorage.removeItem('token')
}

export default function useToken() {
  const [token, setToken] = useState(getToken())
  const saveToken = (token: Token) => {
    const strToken = JSON.stringify(token)
    localStorage.setItem('token', strToken)
    setToken(strToken)
  }
  return {
    token,
    setToken: saveToken,
  }
}
