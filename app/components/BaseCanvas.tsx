'use client'

import { Canvas as Canvas } from '@react-three/fiber'
import { BasicShadowMap, PCFSoftShadowMap, VSMShadowMap } from 'three'

type Props = {
	children: React.ReactNode
}

export default function BaseCanvas(props: Props) {
	const { children } = props

	return (
		<Canvas shadows={{ enabled: true, type: VSMShadowMap }}>
			{children}
		</Canvas>
	)
}
