# vue-gooey-cursor

Gooey Cursor Component for Vue 3.

## Install

```sh
npm i vue-gooey-cursor
```

## Register the component

```js
import GooeyCursor from 'vue-gooey-cursor'

// register globally
app.component('GooeyCursor', GooeyCursor)

// or locally
export default {
	components: { GooeyCursor },
	// ...
}
```

## Usage

```html
<!-- simple -->
<GooeyCursor />

<!-- with default props -->
<GooeyCursor color="#42b883" :size="32" :length="8" hover="a, button" />
```

## Props

#### color

-  _Optional_
-  Type: `String`
-  color of the cursor, any format accepted by css will work

#### size

-  _Optional_
-  Type: `Number`
-  width and height of the cursor in px

#### length

-  _Optional_
-  Type: `Number`
-  number of dots forming the tail of the cursor

#### hover

-  _Optional_
-  Type: `String`
-  selector string, cursor will grow and turn transparent while hoverind on these elements

## Styles

For the cursor to work correctly, please apply these base styles to your page:

```css
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
```

## CSS Variables

Some css properties can be easily changed by setting css variables.

```css
.gooey-cursor {
	--z-index: 1000; /* default: 9999 */
	--color: orange; /* default: #42b883 */
}
```
