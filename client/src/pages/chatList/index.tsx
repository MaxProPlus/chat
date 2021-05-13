import React, {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {CircularProgress, Container, Grid, Typography} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Routes_uri from 'routes/routes_uri'
import ChatApi from 'api/chat'
import Header from 'components/header'

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const update = useCallback(() => {
    setLoading(true)
    ChatApi.getAll()
      .then(
        (r) => setChats(r),
        (err) => setError(err)
      )
      .finally(() => setLoading(false))
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => update(), [])
  return (
    <Container maxWidth="sm" className="mt-3">
      <Header />
      <br className="mt-3" />
      {error && <Alert severity="error">{error}</Alert>}
      {!loading ? (
        chats.length ? (
          chats.map((el) => (
            <Grid container direction="column" spacing={3} key={el.id}>
              <Grid
                item
                component={Link}
                // to={Routes_uri.CHAT + '?chatId=' + el.id}
                to={
                  Routes_uri.CHAT + (el.to ? '?to=' + el.to : '?chatId=' + el.id)
                }
                className="link"
              >
                <Typography color="primary">{el.title}</Typography>
                <div>{el.lastMessage && el.lastMessage.body}</div>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography>Нет чатов</Typography>
        )
      ) : (
        <CircularProgress className="d-block mx-auto" />
      )}
    </Container>
  )
}

export default ChatList
