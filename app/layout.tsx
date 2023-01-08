import { AnalyticsWrapper } from './components/analytics'
import './globals.css'

type Props = {
  children: React.ReactNode
}

export default function RootLayout(props: Props) {
  const {children } = props
  return (
    <html lang="en">
      <head />
      
      <body>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
