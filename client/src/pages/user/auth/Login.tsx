import React, {useCallback, useState} from 'react'
import {useHistory} from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {Alert} from '@material-ui/lab'
import UserApi from 'api/user/user'
import Routes_uri from 'routes/routes_uri'
import useToken, {Token} from 'hooks/useToken'

export default function Login() {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {setToken} = useToken()

  const login = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const user = {
        username,
        password,
      }
      setLoading(true)
      UserApi.login(user).then(
        (r: Token) => {
          setToken(r)
          history.replace(Routes_uri.CHAT_LIST)
        },
        (error) => {
          setError(error)
          setLoading(false)
        }
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username, password]
  )

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" onSubmit={login} mt={6}>
        <Typography component="h1" variant="h4" align="center">
          Вход
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
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
          type="password"
          value={password}
          onChange={useCallback((e) => setPassword(e.target.value), [])}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Войти
          {loading && (
            <CircularProgress
              className="spinner"
              color="secondary"
              size={24}
            />
          )}
        </Button>
      </Box>
    </Container>
  )
}
