'use client'

import { Canvas } from '@react-three/fiber'
import {
	Icosahedron,
	OrbitControls,
	OrthographicCamera,
} from '@react-three/drei'
import { useMemo } from 'react'

import { toThreeColor, useCssVariable } from './useCssVariable'

const NUM = 3

interface Positions {
	id: string
	position: [number, number, number]
}

function Scene() {
	const positions = useMemo(() => {
		const pos: Positions[] = []
		const half = (NUM - 1) / 2

		for (let x = 0; x < NUM; x++) {
			for (let y = 0; y < NUM; y++) {
				pos.push({
					id: `${x}-${y}`,
					position: [(x - half) * 4, (y - half) * 4, 0],
				})
			}
		}

		return pos
	}, [])

	const color = useCssVariable('--p', toThreeColor)

	return (
		<Canvas>
			<OrthographicCamera makeDefault zoom={40} />

			<group position={[0, 0, -10]}>
				{positions.map(({ id, position }) => (
					<Icosahedron key={id} position={position} args={[1, 1]}>
						<meshBasicMaterial color={color} wireframe />
					</Icosahedron>
				))}
			</group>

			<OrbitControls />
		</Canvas>
	)
}

export default Scene
