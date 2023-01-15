'use client'

import { Gltf } from '@react-three/drei'
import { useControls } from 'leva'

import { staticPath } from '#/app/$path'
import Environment from './BaseEnvironment'

function Scene() {
	const { rotation } = useControls({
		rotation: { value: [0.33, 0.8, 0] },
	})

	return (
		<>
			<Environment />

			<Gltf
				src={staticPath.assets.rooms.low_poly_isometric_rooms_glb}
				rotation={rotation}
				receiveShadow
				castShadow
			/>
		</>
	)
}

export default Scene
