import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootStore} from './store'

interface ChatStore {
  title: string
  messages: any[]
}

const initialState: ChatStore = {
  title: '',
  messages: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<ChatStore>) => {
      state.title = action.payload.title
      state.messages = action.payload.messages
    },
    addMessage: (state, action: PayloadAction<any>) => {
      state.messages.push(action.payload)
    },
    clearChat: (state) => {
      state.title = initialState.title
      state.messages = []
    }
  }
})

export const {setChat, addMessage, clearChat} = chatSlice.actions

export const selectChat = (state: RootStore) => state.chat

export default chatSlice.reducer