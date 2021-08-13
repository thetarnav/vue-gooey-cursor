<script lang="ts">
import { defineComponent } from 'vue'
import GooeyCursor from '@/vue-gooey-cursor.vue'

export default defineComponent({
	name: 'ServeDev',
	components: {
		GooeyCursor,
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
</style>
