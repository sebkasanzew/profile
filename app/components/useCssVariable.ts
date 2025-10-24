import { useEffect, useState, startTransition } from 'react'
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

		startTransition(() => {
			if (cssValue && parse) {
				setValue(parse(cssValue))
			} else if (cssValue) {
				setValue(cssValue as TValue)
			} else {
				setValue(undefined)
			}
		})
	}, [parse, variableName])

	return value
}

export function HslToThreeColor(color: string): Color | undefined {
	if (!color) {
		return
	}

	const hsl = color.trim().replaceAll(' ', ', ')

	return new Color(`hsl(${hsl})`)
}

export function HslToHexColor(color: string): string | undefined {
	if (!color) {
		return
	}

	const threeColor = HslToThreeColor(color)

	if (!threeColor) {
		return
	}

	return '#' + threeColor.getHexString()
}
