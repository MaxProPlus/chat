import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit'
// import counterReducer from '../pages/chat/counterSlice'
// import chatReducer from '../pages/chat/chatSlice'
// import contactsReducer from '../pages/chat/Contacts/contactsSlice'
import chatReducer from './chatSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    chat: chatReducer,
    // contact: contactsReducer
  },
})

export type RootStore = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStore,
  unknown,
  Action<string>
>
