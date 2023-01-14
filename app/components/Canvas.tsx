'use client'

import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { BasicShadowMap, PCFSoftShadowMap } from 'three'

type Props = {
	children: React.ReactNode
}

export default function Canvas(props: Props) {
	const { children } = props

	return <ThreeCanvas shadows>{children}</ThreeCanvas>
}
