'use client'

import { Leva } from 'leva'

const HIDDEN = process.env.NEXT_PUBLIC_ENVIRONMENT !== 'development'

export default function LevaSettings() {
	return <Leva hidden={HIDDEN} />
}
