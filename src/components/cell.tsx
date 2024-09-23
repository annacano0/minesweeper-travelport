import { useState } from 'react'
import './styles/cell.css'

import {ReduxState} from '../lib/store';
import { useSelector } from 'react-redux'
import {isTaggedType} from '../lib/types/MinefieldTypes'

interface CellProps{
  rowPosition: number, 
  colPosition: number,
  hasMine: boolean, 
  numberOfMinesAround:number,
  isCovered: boolean, 
  onClick: ( rowPosition: number, colPosition: number) => void
}

export default function Cell ({ rowPosition, colPosition, hasMine, numberOfMinesAround, isCovered, onClick }:CellProps) {
  const [isTagged, setIsTagged] = useState<isTaggedType>('')
  const gameStatus = useSelector((state: ReduxState) => state.game.value);


  function handleClick (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (!isTagged) {
      onClick(rowPosition, colPosition)
    }
  }

  function handleContextMenu (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (gameStatus === 'playing') {
      let newState:isTaggedType = ''
      if (isTagged === '') {
        newState = 'mined'
      } else if (isTagged === 'mined') {
        newState = 'inconclusive'
      } else {
        newState = ''
      }
      setIsTagged(newState)
    }
  }

  function getUncoveredCell (){
    return (
      <div
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className={`minefield-cell ${hasMine && 'highlighted'}`}
      >
        {getUncoveredCellImage()}
      </div>
    )
  }

  function getUncoveredCellImage () {
    let imgSource: string
    let altText: string
    if (hasMine) {
      if (isCovered) {
        imgSource = '/tiles/bombCell.png'
        altText = 'Mine'
      } else {
        imgSource = '/tiles/detonateBombCell.png'
        altText = 'Explosion'
      }
    } else {
      imgSource = `/tiles/cell${numberOfMinesAround}.png`
      if (numberOfMinesAround === 0) {
        altText = 'Empty cell'
      } else {
        altText = 'Number of adjacent mines: ' + numberOfMinesAround
      }
    }
    return (
      <img
        src={imgSource}
        alt={altText}
      />
    )
  }

  if (!isCovered || (gameStatus === 'lost' && hasMine)) {
    return (
      getUncoveredCell()
    )
  } else {
    return (
      <button
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        data-testid={`minefield-cell cell-row${rowPosition}-col${colPosition}`}
        className='minefield-cell covered'
        disabled={gameStatus !== 'playing'}
      >
        {((hasMine && gameStatus === 'won') || (isTagged === 'mined' && gameStatus === 'playing')) && <img src='/tiles/flagCell.png' alt='Flaged cell' />}
        {(isTagged === 'mined' && !hasMine && gameStatus === 'lost') && <img src='/tiles/notBombCell.png' alt='Wrongly tagged mine' />}
        {isTagged === 'inconclusive' && <img src='/tiles/inconclusiveCell.png' alt='Inconclusive cell' />}
      </button>
    )
  }
}
