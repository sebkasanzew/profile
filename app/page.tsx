import { Leva } from 'leva'
import Canvas from './components/Canvas'
import LevaSettings from './components/LevaSettings'
import Scene from './components/Scene'

export default function Home() {
	return (
		<main style={{ height: '100vh' }}>
			<Canvas>
				<Scene />
			</Canvas>

			<p>
				{`This work is based on "Low Poly Isometric Rooms" \
(https://sketchfab.com/3d-models/low-poly-isometric-rooms-d53af0ad289a403598ee2cb41d84608b) \
by Brynn (https://sketchfab.com/Brynnnnn) \
licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)`}
			</p>

			<LevaSettings />
		</main>
	)
}
