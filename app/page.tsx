import { Leva } from 'leva'
import Link from 'next/link'
import BaseCanvas from './components/BaseCanvas'
import LevaSettings from './components/LevaSettings'
import Scene from './components/Scene'

export default function Home() {
	return (
		<main className='h-screen overflow-hidden relative'>
			<BaseCanvas>
				<Scene />
			</BaseCanvas>

			<section className='absolute bottom-4 right-4 rounded'>
				<label htmlFor='credits-modal' className='btn btn-ghost'>
					credits
				</label>

				<input
					type='checkbox'
					id='credits-modal'
					className='modal-toggle'
				/>

				<label htmlFor='credits-modal' className='modal cursor-pointer'>
					<label className='modal-box relative' htmlFor=''>
						<h3 className='text-lg font-bold'>
							Thanks for the inspiration!
						</h3>
						<p className='py-4'>
							{
								'This work is based on "Low Poly Isometric Rooms" ('
							}
							<Link href='https://sketchfab.com/3d-models/low-poly-isometric-rooms-d53af0ad289a403598ee2cb41d84608b'>
								https://sketchfab.com/3d-models/low-poly-isometric-rooms-d53af0ad289a403598ee2cb41d84608b
							</Link>
							{') by Brynn ('}
							<Link href='https://sketchfab.com/Brynnnnn'>
								https://sketchfab.com/Brynnnnn
							</Link>
							{') licensed under CC-BY-4.0 ('}
							<Link href='http://creativecommons.org/licenses/by/4.0/'>
								http://creativecommons.org/licenses/by/4.0/
							</Link>
							{')'}
						</p>
					</label>
				</label>
			</section>

			<LevaSettings />
		</main>
	)
}
