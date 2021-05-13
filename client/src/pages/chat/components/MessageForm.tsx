import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
} from '@material-ui/core'
import ChatApi from 'api/chat'
import {addMessage} from 'redux/chatSlice'
import Alert from '@material-ui/lab/Alert'

const MessageForm = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  let chatId = new URLSearchParams(location.search).get('chatId')
  let userId = new URLSearchParams(location.search).get('to')

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    ;(userId
      ? ChatApi.sendMessageByUserId(userId as string, message)
      : ChatApi.sendMessageByChatId(chatId as string, message)
    ).then(
      (r) => {
        setMessage('')
        setLoading(false)
        dispatch(addMessage(r))
      },
      (err) => {
        setLoading(false)
        setOpenModal(true)
        setError(err[0])
      }
    )
  }
  return (
    <>
      <Modal className="message-form__error-modal" open={openModal} onClose={() => setOpenModal(false)}>
        <Alert severity="error">{error}</Alert>
      </Modal>
      <Box className="message-form" component="form" onSubmit={sendMessage}>
        <TextField
          fullWidth
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          className="message-form__btn"
        >
          Отправить
          {loading && (
            <CircularProgress
              className="message-form__spinner"
              color="secondary"
              size={24}
            />
          )}
        </Button>
      </Box>
    </>
  )
}

export default MessageForm
