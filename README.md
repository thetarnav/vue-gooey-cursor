# vue-gooey-cursor
Gooey Cursor Component for Vue 3.

### Install
```sh
npm i vue-gooey-cursor
```

### Register the component
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

### Usage
```html
<!-- simple -->
<GooeyCursor />

<!-- with props -->
<GooeyCursor color="#ff8e6e" :size="24" :length="6"/>
```

### Props
 #### color
   - *Optional*
   - Type: `String`
   - color of the cursor, any format accepted by css will work

 #### size
   - *Optional*
   - Type: `Number`
   - width and height of the cursor in px

 #### length
   - *Optional*
   - Type: `Number`
   - number of dots forming the tail of the cursor