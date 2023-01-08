import { SetStateAction, useEffect, useState } from 'react'
import { Color } from 'three'

export function useCssVariable<TValue = string | undefined>(
	variableName: string,
	parse?: (c: string) => TValue,
) {
	const [value, setValue] = useState<TValue>()

	useEffect(() => {
		const style = getComputedStyle(document.documentElement)
		const value = style.getPropertyValue(variableName)

		if (value && parse) {
			setValue(parse(value))
		} else {
			setValue(value as SetStateAction<TValue | undefined>)
		}
	}, [parse, variableName])

	return value
}

export function toThreeColor(color: string): Color | undefined {
	if (!color) {
		return
	}

	const hsl = color.trim().replaceAll(' ', ', ')

	return new Color(`hsl(${hsl})`)
}
