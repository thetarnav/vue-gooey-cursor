<script lang="ts">
import { defineComponent } from 'vue'
// import GlitchedWriter from '@/vue-gooey-cursor.vue'
// @ts-ignore
import * as gooey from '../dist/vue-gooey-cursor.esm.js'

console.log(gooey)

export default defineComponent({
	name: 'HelloWorld',
	components: {
		GooeyCursor: gooey.default,
	},
	setup() {
		return {}
	},
})
</script>

<template>
	<GooeyCursor />
</template>

<style lang="scss">
body {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
html {
	cursor: none;
}
#app {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

	> * {
		margin: 20px auto;
	}
}
</style>
