import { useState } from 'react'

interface MockDataFormProps {
  setData:(data:string) => void;
}

export default function MockDataForm ({ setData }:MockDataFormProps) {
  const [mockData, setMockData] = useState('| * | o |')
  function handleSubmit (e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setData(mockData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMockData(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={mockData}
        cols={40}
        rows={8}
        onChange={handleInputChange}
        data-testid='mock-data-input'
        style={{ width: '100%', height: '300px' }}
      />
      <button data-testid='mock-data-submit' type='submit'>Submit</button>
    </form>
  )
}
