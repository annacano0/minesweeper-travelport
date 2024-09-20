import { configureStore } from '@reduxjs/toolkit'
import gameStatusReducer from './slices/gameStatus'

const store = configureStore({
  reducer: {
    gameStatus: gameStatusReducer
  }
})

export default store
