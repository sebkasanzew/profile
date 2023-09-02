import { Inter, Lora } from 'next/font/google'
import clsx from 'clsx'

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
		<html lang='en' className={clsx([inter.variable, lora.variable])}>
			<head />

			<body className='h-screen overflow-hidden'>
				{children}

				<AnalyticsWrapper />
			</body>
		</html>
	)
}
