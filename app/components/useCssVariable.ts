import { useEffect, useState } from 'react'
import { Color } from 'three'

/**
 *
 * @param variableName - e.g. --color-primary
 * @param parse
 * @returns
 */
export function useCssVariable<TValue = string | undefined>(
	variableName: string,
	parse?: (c: string) => TValue,
) {
	const [value, setValue] = useState<TValue>()

	useEffect(() => {
		const style = getComputedStyle(document.documentElement)
		const cssValue = style.getPropertyValue(variableName)

		if (cssValue && parse) {
			setValue(parse(cssValue))
		} else if (cssValue) {
			setValue(cssValue as TValue)
		} else {
			setValue(undefined)
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
