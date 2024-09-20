import { configureStore } from '@reduxjs/toolkit'
import {gameStatus} from './slices/gameStatus'

export const makeStore = () => {
  return configureStore({
    reducer: {
      game: gameStatus.reducer
    }
  })
}
