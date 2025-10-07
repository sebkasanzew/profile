'use client'

import {
	GradientTexture,
	OrbitControls,
	OrthographicCamera,
	Sparkles,
	Sphere,
	useHelper,
} from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import { BackSide, SpotLight, SpotLightHelper } from 'three'
import { HslToHexColor, useCssVariable } from './useCssVariable'

const SHOW_HELPER = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'

export default function BaseEnvironment() {
	const cameraRef = useRef(null!)
	const spotLightRef = useRef<SpotLight>(null!)

	useHelper(SHOW_HELPER && spotLightRef, SpotLightHelper, 'hotpink')
	// useHelper(cameraRef, CameraHelper)

	const { angle, distance, decay } = useControls({
		angle: { value: Math.PI / 3.8, min: 0, max: Math.PI / 2 },
		distance: { value: 4.5, min: 0, max: 10 },
		decay: { value: 0.2, min: 0, max: 5 },
	})

	const colorBase300 = useCssVariable('--b3', HslToHexColor) ?? '#000'
	const colorPrimary = useCssVariable('--p', HslToHexColor) ?? '#000'

	return (
		<>
			<ambientLight intensity={0.1} />

			<spotLight
				ref={spotLightRef}
				intensity={10}
				position={[0, 2.5, 3]}
				angle={angle}
				target-position={[0, 0.6, 0]}
				penumbra={1}
				castShadow
				shadow-mapSize-height={2048}
				shadow-mapSize-width={2048}
				shadow-bias={-0.0001}
				shadow-camera-near={0.01}
				shadow-camera-far={100}
				shadow-radius={0}
				shadow-blurSamples={2}
				distance={distance}
				decay={decay}
			/>

			<OrthographicCamera
				ref={cameraRef}
				makeDefault
				position={[0, 0, 1000]}
				zoom={80}
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

			<Sphere scale={20}>
				<meshBasicMaterial
					attach='material'
					color='hotpink'
					side={BackSide}
				>
					<GradientTexture
						stops={[0.2, 0.8]}
						colors={[colorPrimary, colorBase300]}
					/>
				</meshBasicMaterial>
			</Sphere>

			<Sparkles scale={20} size={100} count={200} />
		</>
	)
}
