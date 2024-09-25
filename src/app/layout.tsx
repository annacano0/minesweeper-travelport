export const metadata = {
  title: 'Minesweeper',
  description: 'The classic Minesweeper game made in React.Js'
}

interface RootLayoutProps{
  children: React.ReactNode;
}

export default function RootLayout ({ children }:RootLayoutProps) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
