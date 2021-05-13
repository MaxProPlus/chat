import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {ArrowLeft} from '@material-ui/icons'
import Routes_uri from 'routes/routes_uri'
import ChatApi from 'api/chat'
import {clearChat, selectChat, setChat} from 'redux/chatSlice'
import {subscribePrivateChat, unSubscribe} from 'hooks/useWsSubscribe'
import MessageForm from './components/MessageForm'

const Chat: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const to = new URLSearchParams(location.search).get('to')

  const chat = useSelector(selectChat)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadMessages = useCallback(() => {
    setLoading(true)
    ChatApi.getMessageByUserId(to!)
      .then((r) => dispatch(setChat(r)), setError)
      .finally(() => setLoading(false))
  }, [dispatch, to])
  useEffect(() => {
    loadMessages()
    subscribePrivateChat(to!)
    return () => {
      dispatch(clearChat())
      unSubscribe()
    }
  }, [to, loadMessages, dispatch])
  useLayoutEffect(() => {
    // todo костыль на прокрутку вниз
    setTimeout(() => window.scrollTo(0, document.body.clientHeight), 100)
  }, [chat])

  return (
    <Container maxWidth="sm">
      <Grid
        container
        component="header"
        alignItems="center"
        className="chat-header"
      >
        <Grid item>
          <IconButton
            size="small"
            onClick={useCallback(() => history.push(Routes_uri.CHAT_LIST), [
              history,
            ])}
          >
            <ArrowLeft fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography component="h5" variant="h5" className="d-inline-block">
            {!loading ? (
              chat.title
            ) : (
              <CircularProgress className="d-block mx-auto" />
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={1} className="message-list">
        {error && <Alert severity="error">{error}</Alert>}
        {!loading ? (
          chat.messages.map((el: any) => (
            <Grid item key={el.id}>
              <Typography color="primary">{el.from.username}</Typography>
              <div>{el.body}</div>
            </Grid>
          ))
        ) : (
          <CircularProgress className="d-block mx-auto" />
        )}
      </Grid>
      <MessageForm />
    </Container>
  )
}

export default Chat
