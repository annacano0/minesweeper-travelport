'use client' // TODO Why do we need this here?
import { useState, useEffect } from 'react'
import Minefield from './minefield'
import MockDataForm from './mockDataForm'

export default function Game () {
  const [mockDataFormVisible, setMockDataFormVisible] = useState(false)
  const [mockData, setMockData] = useState<string>('')

  useEffect(() => {
    console.log('useEffect') // TODO Is the best way to do in React?
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  function setMockDataForm (data:string) {
    setMockData(data)
    setMockDataFormVisible(false)
  }

  function handleKeyPress (e: KeyboardEvent) {
    if (e.ctrlKey && e.key.toUpperCase() === 'M') {
      setMockDataFormVisible(!mockDataFormVisible)
    }
  }
  return (
    <div>
      <h1>Minesweeper</h1>
      {mockDataFormVisible && <MockDataForm setData={setMockDataForm} />}
      <Minefield  numberOfRows = {9} numberOfColumns = {9} numberOfMines = {10} mockData={mockData} />
    </div>
  )
}
