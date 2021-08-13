export function random(
	min: number,
	max: number,
	math?: 'floor' | 'round' | 'ceil',
): number {
	const result = Math.random() * (max - min) + min
	if (math) {
		// eslint-disable-next-line default-case
		switch (math) {
			case 'floor':
				return Math.floor(result)
			case 'round':
				return Math.round(result)
			case 'ceil':
				return Math.ceil(result)
		}
	}
	return result
}

export const clamp = (value: number, min: number, max: number): number =>
	Math.min(Math.max(value, min), max)

export const deleteRandom = (array: any[]): boolean =>
	array.splice(random(0, array.length, 'floor'), 1).length > 0

export function getRandom<T>(iterable: T[]): T
export function getRandom(iterable: string): string
export function getRandom(iterable: any[] | string): any {
	return iterable[random(0, iterable.length, 'floor')]
}

export function filterDuplicates(iterable: string): string
export function filterDuplicates<T>(iterable: T[]): T[]
export function filterDuplicates(iterable: any[] | string): any {
	const isString = typeof iterable === 'string',
		result: any[] = []
	new Set(iterable).forEach(x => result.push(x))
	return isString ? result.join('') : result
}

export function removeFromArray<T>(array: T[], item: T): T[] {
	return array.splice(array.indexOf(item), 1)
}

export const keyLookup = <T extends Record<string, any>, K extends keyof T>(
	list: T[],
	key: K,
): Record<T[K], number> =>
	list.reduce((a, e) => {
		a[e[key]] = ++a[e[key]] || 1
		return a
	}, {} as Record<K, number>)

export function getObjectDuplicates<
	T extends Record<string, any>,
	K extends keyof T
>(list: T[], key: K): T[] {
	const lookup = keyLookup(list, key)
	return list.filter(e => lookup[e[key]] > 1)
}

export const wait = (time: number): Promise<number> =>
	new Promise(resolve => setTimeout(() => resolve(time), time))

export function promiseWhile(
	conditionFunc: () => boolean,
	actionPromise: () => Promise<any>,
): Promise<void> {
	const whilst = (): Promise<void> =>
		conditionFunc() ? actionPromise().then(whilst) : Promise.resolve()
	return whilst()
}

export const animateWithClass = (
	element: HTMLElement | Element,
	className: string,
): void => {
	element.classList.remove(className)
	// eslint-disable-next-line no-void
	void (element as HTMLElement).offsetWidth
	element.classList.add(className)
}

export const coinFlip = (p = 0.5): boolean => Math.random() < p

export const lerp = (current: number, goal: number, p: number): number =>
	(1 - p) * current + p * goal

export const flipP = (p: number): number =>
	p >= 0 ? Math.abs(p - 1) : Math.abs(p) - 1

export const flipVal = (val: number, min: number, max: number): number =>
	Math.abs(val * (Math.sign(val) || 1) - max) + min

export const pToVal = (p: number, zero: number, hundred: number): number =>
	p * (hundred - zero) + zero

export function valToP(value: number, min: number, max: number): number {
	if (min > max) {
		;[min, max] = [max, min]
		value = flipVal(value, min, max)
	}
	return (value - min) / (max - min)
}

export function valToPwMid(
	value: number,
	min: number,
	max: number,
	turn = pToVal(0.5, min, max),
): number {
	if (min > max) {
		;[min, max] = [max, min]
		turn = flipVal(turn, min, max)
		value = flipVal(value, min, max)
	}
	return value < turn
		? (value - turn) / (turn - min)
		: (value - turn) / (max - turn)
}

export const isInRange = (
	n: number,
	min: number,
	max: number,
	exc = false,
): boolean => {
	if (min > max) {
		const tmpMin = min
		min = max
		max = tmpMin
	}
	return exc ? n > min && n < max : n >= min && n <= max
}

export function roundNumber(num: number, scale: number): number {
	if (!('' + num).includes('e')) {
		return +(Math.round(parseFloat(num + 'e+' + scale)) + 'e-' + scale)
	} else {
		const arr = ('' + num).split('e')
		let sig = ''
		if (+arr[1] + scale > 0) {
			sig = '+'
		}
		return +(
			Math.round(parseFloat(+arr[0] + 'e' + sig + (+arr[1] + scale))) +
			'e-' +
			scale
		)
	}
}

export function capitalize(string: string): string {
	string = string.toLocaleLowerCase()
	return string.charAt(0).toUpperCase() + string.slice(1)
}
