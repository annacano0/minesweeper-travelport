import Game from '../components/game';
import StoreProvider from './StoreProvider'; // Eliminado .jsx ya que TypeScript debe inferir correctamente

export default function Home() {
  return (
    <StoreProvider>
      <Game></Game>
    </StoreProvider>
  );
}
