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
	props: {
		size: { type: Number, default: 32 },
		length: { type: Number, default: 8 },
		color: { type: String, default: undefined },
		hover: { type: String, default: 'a, button' },
	},
	setup(props) {
		let animation: number

		const target: XY = { x: 0, y: 0 }

		const cursors: {
			el: HTMLElement
			p: number
		}[] = []

		const cursorEl = ref<HTMLElement>()

		const mouseOut = ref(true),
			clicking = ref(false),
			hoverActive = ref(false)

		function draw() {
			cursors.forEach(({ el, p }) => followMouse(el, p, target))
			animation = requestAnimationFrame(draw)
		}

		function handleMouseMove(e: MouseEvent) {
			const el = e.target as Element | null
			hoverActive.value = !!el?.matches(props.hover)

			mouseOut.value = false
			target.x = e.clientX - props.size / 2
			target.y = e.clientY - props.size / 2
		}

		onMounted(() => {
			// Set variables: (cursors element list)
			// And set "--scale" css variable
			const children = cursorEl.value?.children
			if (children) {
				;([...children] as HTMLElement[]).forEach((el, i) => {
					const p = valToP(i + 1, 0, props.length)
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
			handleMouseMove,
			mouseOut,
			clicking,
			hoverActive,
		}
	},
})
</script>

<template>
	<svg class="svg-effect">
		<defs>
			<filter id="gooey-cursor-svg-effect">
				<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
				<feColorMatrix
					in="blur"
					mode="matrix"
					values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
					result="gooey-cursor-svg-effect"
				/>
				<feComposite
					in="SourceGraphic"
					in2="gooey-cursor-svg-effect"
					operator="atop"
				/>
			</filter>
		</defs>
	</svg>

	<div
		ref="cursorEl"
		class="gooey-cursor"
		:class="{ mouseOut, clicking, hoverActive }"
		:style="// @ts-ignore
		{ '--color': color || '', '--size': size ? `${size}px` : '' }"
	>
		<div v-for="i in length" :key="i">
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
		@mousedown="clicking = true"
		@mouseup="clicking = false"
	/>
</template>

<style lang="scss" scoped>
$size: 2rem;
$color: #42b883;
$bouncy-easing: cubic-bezier(0.51, 0.06, 0.56, 1.37);

.svg-effect {
	position: absolute;
	width: 0;
	height: 0;
	display: none;
	pointer-events: none;
}

.gooey-cursor {
	pointer-events: none !important;
	position: fixed !important;
	z-index: var(--z-index, 9999);
	top: 0 !important;
	left: 0 !important;
	margin: 0 !important;
	padding: 0 !important;
	filter: url('#gooey-cursor-svg-effect');
	width: var(--size, #{$size});
	height: var(--size, #{$size});
	--largest-scale: 1;
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
			width: 100%;
			height: 100%;
			transform: scale(var(--scale));
			circle {
				fill: var(--color, #{$color});
			}
		}
		// the largest
		&:last-of-type {
			svg {
				transform: scale(var(--largest-scale));
				transition: transform 100ms $bouncy-easing;
			}
		}
	}

	&.mouseOut {
		opacity: 0;
	}

	&.hoverActive {
		opacity: 0.6;
		--largest-scale: 1.4;

		&.clicking {
			--largest-scale: 1.1;
		}
	}

	&.clicking {
		--largest-scale: 1.3;
	}
}
</style>
