import Game from '../components/game'
import StoreProvider from './StoreProvider.jsx'

export default function Home () {
  return (
    <StoreProvider>
      <Game />
    </StoreProvider>
  )
}
