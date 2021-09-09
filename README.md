
# InView: Is it in viewport?

InView.js check if an element is visible in the viewport.

## Getting Started
Using InView is easy.

### Install
Install it from npm.
```bash
npm install @opuu/inview
```

### Import
Import it in your project.
```js
import InView from "@opuu/inview";
```
or
```html
<script type="module">
	import InView from "./path/to/inview.js";
</script>
```


### Usage

```js
// select elements to track
let elements = new InView(".selector");

// add enter event listener
elements.on("enter", (event) => {
	console.log(event);
	// do something on enter
});

// add exit event listener
elements.on("exit", (event) => {
	console.log(event);
	// do something on exit
});
```
