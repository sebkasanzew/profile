import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      <h1 className="text-red-600">Next.js + TypeScript + Tailwind CSS</h1>
    </main>
  )
}
