import { createSlice } from '@reduxjs/toolkit'

export const gameStatus = createSlice({
  name: 'gameStatus',
  initialState: {
    value: 'playing',
  },
  reducers: {

    setPlaying: (state) => {
      state.value = 'playing'
    },
    winGame: (state) => {
      state.value = 'won'
    },
    loseGame: (state) => {
      state.value = 'lost'
    },
    waitGame: (state) => {
      state.value = 'waiting'

    }
  }
})

export const { loseGame, winGame, setPlaying } = gameStatus.actions
export default gameStatus.reducer