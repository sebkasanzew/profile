import { Inter, Lora } from '@next/font/google'

import { AnalyticsWrapper } from './components/analytics'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

type Props = {
	children: React.ReactNode
}

export default function RootLayout(props: Props) {
	const { children } = props

	return (
		<html lang='en' className={[inter.variable, lora.variable].join(' ')}>
			<head />

			<body style={{ height: '100vh' }}>
				{children}

				<AnalyticsWrapper />
			</body>
		</html>
	)
}
