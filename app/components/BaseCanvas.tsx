'use client'

import { Canvas as Canvas } from '@react-three/fiber'
import { PCFShadowMap } from 'three'

interface Props {
	children: React.ReactNode
}

export default function BaseCanvas(props: Props) {
	const { children } = props

	return (
		<Canvas shadows={{ enabled: true, type: PCFShadowMap }}>
			{children}
		</Canvas>
	)
}
