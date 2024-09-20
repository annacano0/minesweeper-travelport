export const metadata = {
  title: 'Minesweeper',
  description: 'The classic Minesweeper game made in React.Js'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
