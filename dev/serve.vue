<script lang="ts">
import { defineComponent } from 'vue'
import VueGooeyCursor from '@/vue-gooey-cursor.vue'

export default defineComponent({
	name: 'ServeDev',
	components: {
		VueGooeyCursor,
	},
})
</script>

<template>
	<vue-gooey-cursor />
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
