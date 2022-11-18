# InView: Is it in viewport?

Checks if an element is visible in the viewport.

Lazyload any content, animate elements on scroll, infinite scrolling and many more things can be done with this simple, tiny library.

## Getting Started

Using InView is easy.

### Install

Install it from npm.

```bash
npm install @opuu/inview
```

### Import

Import it in your project

```js
import InView from "@opuu/inview";
```

For browser, you can use the `dist/inview.min.js` file or use the CDN if you are not using any module bundler and npm.

```html
<script type="module">
  import InView from "node_modules/@opuu/inview/dist/inview.min.js";

  // or use the CDN

  import InView from "https://cdn.jsdelivr.net/npm/@opuu/inview/dist/inview.min.js";
</script>
```

### Usage

```js
// Pass the selector to the InView constructor to create an instance
// This observes all elements with the selector
let elements = new InView(".selector");

// add enter event listeners to the instance
elements.on("enter", (event) => {
  console.log(event);
  // do something on enter
});

// add exit event listeners to the instance
elements.on("exit", (event) => {
  console.log(event);
  // do something on exit
});
```

### Methods

#### on(event, callback)

Add event listener to elements.

Supported events are `enter` and `exit`.

```js
elements.on("enter", (event) => {
  console.log(event);
  // do something on enter
});

elements.on("exit", (event) => {
  console.log(event);
  // do something on exit
});
```

#### pause()

Pause observing.

```js
elements.pause();
```

#### resume()

Resume observing.

```js
elements.resume();
```

#### setDelay(delay = 0)

Set delay for callback.
Default delay is 0 ms.

```js
elements.setDelay(100);
```
