# InView: Is it in viewport?

[![](https://data.jsdelivr.com/v1/package/npm/@opuu/inview/badge)](https://www.jsdelivr.com/package/npm/@opuu/inview)

A library to checks if an element is visible in the viewport.

Lazyload any content, animate elements on scroll, infinite scrolling and many more things can be done with this simple, tiny library.

## Getting Started

Using InView is easy.

### Install

Install it from npm, pnpm or yarn

```bash
npm install @opuu/inview
```

```bash
pnpm install @opuu/inview
```

```bash
yarn add @opuu/inview
```

### Import

For module bundlers like webpack, rollup, parcel, etc.

```js
import InView from "@opuu/inview";
```

For browsers that support ES modules, you can use the script tag with `type="module"`.

```html
<script type="module">
	import InView from "node_modules/@opuu/inview/dist/inview.js";
</script>
```

Or you can directly import it from CDN.

```html
<script>
	import InView from "https://cdn.jsdelivr.net/npm/@opuu/inview/dist/inview.js";
</script>
```

### Usage

You can use InView in two ways.

Directly selecting the elements

```js
const elements = new InView(".css-selector");

elements.on("enter", (event) => {
	console.log(event);
	// do something on enter
});

elements.on("exit", (event) => {
	console.log(event);
	// do something on exit
});
```

or configuring it for more control.

```js
const element = new InView({
	selector: ".css-selector",
	delay: 100,
	precision: "high",
	single: true,
});

element.on("enter", (event) => {
	console.log(event);
	// do something on enter
});

element.on("exit", (event) => {
	console.log(event);
	// do something on exit
});
```

For TypeScript users, you can import the types and use it like this.

```ts
import InView from "@opuu/inview";
import type { InViewConfig, InViewEvent } from "@opuu/inview";

const config: InViewConfig = {
	selector: ".css-selector",
	delay: 0,
	precision: "medium",
	single: true,
};

const element: InView = new InView(config);

element.on("enter", (event: InViewEvent) => {
	console.log(event);
	// do something on enter
});

element.on("exit", (event: InViewEvent) => {
	console.log(event);
	// do something on exit
});
```

### Usage with Vue

InView provides two Vue directives for easy integration with Vue components.

#### Global directive

```js
const app = createApp(App);

app.directive("inview", createInViewDirective({ delay: 100, precision: "high", single: true }));
app.directive("outview", createOutViewDirective());

app.mount("#app");
```

```html
<template>
	<div v-inview="onEnterHandler" v-outview="onExitHandler">
		<!-- your content -->
	</div>
</template>
```

> Note: If the directive is used in only one component, you can register the directive locally in the component instead of globally.

### Methods

#### constructor(config: InViewConfig | string): InView

Create a new instance of InView.

```js
const elements = new InView(".css-selector");
```

or

```js
const element = new InView({
	selector: ".css-selector",
	delay: 100,
	precision: "high",
	single: true,
});
```

The config object is an instance of `InViewConfig` interface. Here are the properties of the config object and their default values.

| Property  | Type                        | Required | Default  | Description                                                    |
| :-------- | :-------------------------- | :------- | :------- | :------------------------------------------------------------- |
| selector  | string                      | true     |          | CSS selector for the elements to observe.                      |
| delay     | number                      | false    | 0        | Delay in milliseconds for callback.                            |
| precision | "low" \| "medium" \| "high" | false    | "medium" | Precision of the intersection observer.                        |
| single    | boolean                     | false    | false    | Whether to observe only the first element or all the elements. |

Here is the interface for the config object.

```ts
interface InViewConfig {
	selector: string;
	delay?: number;
	precision?: "low" | "medium" | "high";
	single?: boolean;
}
```

#### on(event: "enter" | "exit", callback: CallableFunction): InView

Add event listener for enter and exit events.

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

The event object is an instance of `InViewEvent` interface. Here are the properties of the event object.

| Property           | Type                    | Description                                                                              |
| :----------------- | :---------------------- | :--------------------------------------------------------------------------------------- |
| percentage         | number                  | Percentage of the element visible in the viewport.                                       |
| rootBounds         | DOMRectReadOnly \| null | The rectangle that is used as the intersection observer's viewport.                      |
| boundingClientRect | DOMRectReadOnly         | The rectangle describing the element's size and position relative to the viewport.       |
| intersectionRect   | DOMRectReadOnly         | The rectangle describing the intersection between the observed element and the viewport. |
| target             | Element                 | The observed element.                                                                    |
| time               | number                  | The time at which the event was triggered.                                               |
| event              | "enter" \| "exit"       | The event type.                                                                          |

Here is the interface for the event object.

```ts
interface InViewEvent {
	percentage: number;
	rootBounds: DOMRectReadOnly | null;
	boundingClientRect: DOMRectReadOnly;
	intersectionRect: DOMRectReadOnly;
	target: Element;
	time: number;
	event: "enter" | "exit";
}
```

#### pause() : InView

Pause observing.

```js
elements.pause();
```

#### resume() : InView

Resume observing.

```js
elements.resume();
```

#### setDelay(delay = 0) : InView

Set delay for callback.
Default delay is 0 ms.

```js
elements.setDelay(100);
```

## License

MIT License

## Author

[Obaydur Rahman](https://opu.rocks)

## References

- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Intersection Observer API - Browser Support](https://caniuse.com/intersectionobserver)
