import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'playing'
}

export const gameStatusReducer = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    loseGame: (state) => {
      state.value = 'lost'
    },
    winGame: (state) => {
      state.value = 'won'
    },
    setPlaying: (state) => {
      state.value = 'playing'
    }
  }
})

export const { loseGame, winGame, setPlaying } = gameStatusReducer.actions
export default gameStatusReducer.reducer
