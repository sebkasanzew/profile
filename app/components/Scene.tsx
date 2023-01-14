'use client'

import {
	Gltf,
	OrbitControls,
	OrthographicCamera,
	PerspectiveCamera,
	useHelper,
} from '@react-three/drei'
import { CameraHelperProps } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { CameraHelper, PointLight } from 'three'

import { staticPath } from '#/app/$path'

function Scene() {
	const cameraRef = useRef(null!)
	const pointLightRef = useRef<PointLight>(null!)

	// useHelper(pointLightRef, PointLightHelper, 0.5, 'hotpink')
	// useHelper(cameraRef, CameraHelper)

	const { intensity, position } = useControls({
		intensity: { value: 0.5, min: 0, max: 5 },
		position: { value: [0, 2.5, 0] },
	})

	const { rotation } = useControls({
		rotation: { value: [0.33, 0.8, 0] },
	})

	return (
		<>
			<ambientLight intensity={0.03} />

			<pointLight
				ref={pointLightRef}
				intensity={intensity}
				position={position}
				castShadow
				shadow-bias={-0.001}
				shadow-camera-near={0.01}
				shadow-camera-far={300}
			/>

			{/* <PerspectiveCamera ref={cameraRef} position={[0, 0, 20]} /> */}

			<OrthographicCamera
				ref={cameraRef}
				makeDefault
				position={[0, 0, 1000]}
				zoom={80}
			/>

			<Gltf
				src={staticPath.assets.rooms.low_poly_isometric_rooms_glb}
				rotation={rotation}
				receiveShadow
				castShadow
			/>

			<OrbitControls
				maxZoom={150}
				minZoom={40}
				maxPolarAngle={(Math.PI / 4) * 2.5}
				minPolarAngle={Math.PI / 3}
				maxAzimuthAngle={Math.PI / 4}
				minAzimuthAngle={-Math.PI / 4}
				enablePan={false}
			/>
		</>
	)
}

export default Scene
