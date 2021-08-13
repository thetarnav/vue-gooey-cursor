<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { lerp, valToP } from './functions'
import { GlobalEvents } from 'vue-global-events'

interface XY {
	x: number
	y: number
}

const setTransform = (element: HTMLElement, x: number, y: number): void => {
	if (element.style)
		element.style.transform = `translateX(${x}px) translateY(${y}px)`
}

const followMouse = (element: HTMLElement, p: number, target: XY): void => {
	const { left, top } = element.getBoundingClientRect()

	// Apply LERP
	const x = lerp(left, target.x, p)
	const y = lerp(top, target.y, p)

	// Set Position using Transforms
	setTransform(element, x, y)
}

export default defineComponent({
	name: 'GooeyCursor',
	components: {
		GlobalEvents,
	},
	setup() {
		let animation: number

		const target: XY = { x: 0, y: 0 },
			size: XY = { x: 32, y: 32 },
			nCircles = 8

		const cursors: {
			el: HTMLElement
			p: number
		}[] = []

		const cursorEl = ref<HTMLElement>()
		const mouseOut = ref(true)

		function draw() {
			cursors.forEach(({ el, p }) => followMouse(el, p, target))
			animation = requestAnimationFrame(draw)
		}

		function handleMouseMove(e: MouseEvent) {
			mouseOut.value = false
			target.x = e.clientX - size.x / 2
			target.y = e.clientY - size.y / 2
		}

		onMounted(() => {
			// Set variables: (cursors element list)
			// And set "--scale" css variable
			const children = cursorEl.value?.children
			if (children) {
				;([...children] as HTMLElement[]).forEach((el, i) => {
					const p = valToP(i + 1, 0, nCircles)
					cursors.push({
						el,
						p,
					})
					el.style.setProperty('--scale', String(p))
				})
			}

			animation = requestAnimationFrame(draw)
		})
		onUnmounted(() => {
			cancelAnimationFrame(animation)
		})

		return {
			cursorEl,
			nCircles,
			handleMouseMove,
			mouseOut,
		}
	},
})
</script>

<template>
	<svg
		class="svg-effect"
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		width="800"
	>
		<defs>
			<filter id="goo">
				<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
					result="goo"
				/>
				<feComposite in="SourceGraphic" in2="goo" operator="atop" />
			</filter>
		</defs>
	</svg>

	<div ref="cursorEl" class="cursor" :class="{ mouseOut }">
		<div v-for="i in nCircles" :key="i">
			<svg viewBox="0 0 10 10">
				<circle cx="5" cy="5" r="4" />
			</svg>
		</div>
	</div>

	<GlobalEvents
		@mousemove="handleMouseMove"
		@mouseout="mouseOut = true"
		@mouseleave="mouseOut = true"
		@mouseenter="mouseOut = false"
	/>
</template>

<style lang="scss" scoped>
$size: 2rem;

.svg-effect {
	position: absolute;
	width: 0;
	height: 0;
	display: none;
	pointer-events: none;
}

.cursor {
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	filter: url('#goo');
	//   mix-blend-mode: difference;
	width: $size;
	height: $size;

	transition: opacity 0.2s;

	div {
		--scale: 1;
		position: absolute;
		display: flex;
		box-sizing: border-box;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		will-change: transform;
		svg {
			margin: auto;
			width: calc(var(--scale) * #{$size});
			height: calc(var(--scale) * #{$size});
			circle {
				fill: red;
			}
		}
	}
}

.mouseOut {
	opacity: 0;
}
</style>
