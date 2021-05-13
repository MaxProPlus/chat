import React, {useCallback, useState} from 'react'
import {Button, Container, TextField, Typography} from '@material-ui/core'
import UserApi from 'api/user/user'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const signup = useCallback(
    (e) => {
      e.preventDefault()
      UserApi.signup({
        username,
        password,
        repeatPassword,
      }).then(
        (r) => {
          console.log(r)
        },
        (err) => {
          console.error('singUp: ', err)
        }
      )
    },
    [username, password, repeatPassword]
  )
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={signup}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="username"
            label="Username"
            value={username}
            onChange={useCallback((e) => setUsername(e.target.value), [])}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="password"
            label="Password"
            value={password}
            onChange={useCallback((e) => setPassword(e.target.value), [])}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="repeatPassword"
            label="Repeat Password"
            value={repeatPassword}
            onChange={useCallback((e) => setRepeatPassword(e.target.value), [])}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" onClick={signup}>
            Зарегистрироваться
          </Button>
        </form>
      </Container>
    </div>
  )
}
