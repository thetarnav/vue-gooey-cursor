<script lang="ts">
import { defineComponent } from 'vue'
import GooeyCursor from '@/vue-gooey-cursor.vue'
// @ts-ignore
// import GooeyCursor from '../dist/vue-gooey-cursor.esm.js'

// console.log(gooey)

export default defineComponent({
	name: 'HelloWorld',
	components: {
		GooeyCursor,
	},
	setup() {
		return {}
	},
})
</script>

<template>
	<GooeyCursor />
	<a href="#">link test</a>
	<div class="box"></div>
	<button>button test</button>
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur
		voluptatem labore soluta doloremque sapiente, ab nostrum dolorem? Minus
		consequuntur, exercitationem, laborum vitae, dignissimos cum optio saepe
		molestiae soluta nemo praesentium!
	</p>
	<div class="fixed-box"></div>
</template>

<style lang="scss">
body {
	min-width: 100vw;
	min-height: 100vh;
	overflow: hidden;
}
html {
	cursor: none;
}
a {
	cursor: none;
}
button {
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

	.box {
		width: 200px;
		height: 300px;
		background: #000;
	}
}
.fixed-box {
	position: fixed;
	right: 5vw;
	top: 50vh;
	left: 65vw;
	bottom: 30vh;
	background: red;
}

.cursor {
	--color: orange;
}
</style>
