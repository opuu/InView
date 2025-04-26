# InView: Detect Element Visibility in the Viewport

**InView** is a lightweight, high-performance JavaScript library for detecting when elements enter or exit the viewport. Perfect for lazy loading, scroll-triggered animations, infinite scrolling, and more.

[![](https://data.jsdelivr.com/v1/package/npm/@opuu/inview/badge)](https://www.jsdelivr.com/package/npm/@opuu/inview)

---

## 🚀 Features

- **Simple API**: Intuitive and flexible configuration
- **TypeScript Support**: Complete type definitions included
- **Vue.js Integration**: Custom directives for seamless usage
- **High Performance**: Minimal overhead, efficient observation
- **Customizable**: Precision, delay, and single/multi-element support
- **Modern Browser Support**: Built on Intersection Observer API

---

## 📚 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
    - [Constructor](#constructor)
    - [InViewConfig Interface](#inviewconfig-interface)
    - [Methods](#methods)
    - [InViewEvent Object](#inviewevent-object)
- [Examples](#examples)
    - [Basic Usage](#basic-usage)
    - [Advanced Configuration](#advanced-configuration)
    - [TypeScript Example](#typescript-example)
    - [Vue.js Integration](#vuejs-integration)
- [Browser Support](#browser-support)
- [License](#license)
- [Author](#author)
- [References](#references)

---

## 📦 Installation

Install via your preferred package manager:

```bash
npm install @opuu/inview
# or
pnpm install @opuu/inview
# or
yarn add @opuu/inview
```

Or use via CDN:

```html
<script type="module">
	import InView from "https://cdn.jsdelivr.net/npm/@opuu/inview/dist/inview.js";
</script>
```

---

## ⚡ Quick Start

### Import

**For module bundlers (webpack, rollup, parcel, etc.):**

```js
import InView from "@opuu/inview";
```

**For browsers with ES module support:**

```html
<script type="module">
	import InView from "node_modules/@opuu/inview/dist/inview.js";
</script>
```

Or use the CDN snippet above.

---

## 🛠️ API Reference

### Constructor

Create a new InView instance by passing a CSS selector or a configuration object:

```js
const inview = new InView(selectorOrConfig);
```

- `selectorOrConfig`: `string` (CSS selector) or [`InViewConfig`](#inviewconfig-interface) object

---

### InViewConfig Interface

Configure observation with the following options:

```ts
interface InViewConfig {
	selector: string;
	delay?: number;
	precision?: "low" | "medium" | "high";
	single?: boolean;
}
```

| Property  | Type                        | Default  | Description                             |
| --------- | --------------------------- | -------- | --------------------------------------- |
| selector  | string                      | —        | CSS selector for elements to observe    |
| delay     | number                      | 0        | Delay (ms) before triggering callbacks  |
| precision | "low" \| "medium" \| "high" | "medium" | Intersection precision                  |
| single    | boolean                     | false    | Observe only the first matching element |

---

### Methods

#### `on(event, callback)`

Listen for `"enter"` or `"exit"` events:

```js
inview.on("enter", (event) => {
	// Element entered viewport
});
inview.on("exit", (event) => {
	// Element exited viewport
});
```

- `event`: `"enter"` or `"exit"`
- `callback`: `(event: InViewEvent) => void`

#### `pause()`

Pause observation:

```js
inview.pause();
```

#### `resume()`

Resume observation:

```js
inview.resume();
```

#### `setDelay(delay)`

Set callback delay (in ms):

```js
inview.setDelay(200);
```

---

### InViewEvent Object

The callback for `"enter"` and `"exit"` receives an `InViewEvent` object:

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

| Property           | Type                    | Description                      |
| ------------------ | ----------------------- | -------------------------------- |
| percentage         | number                  | % of element visible in viewport |
| rootBounds         | DOMRectReadOnly \| null | Viewport rectangle               |
| boundingClientRect | DOMRectReadOnly         | Element's rectangle              |
| intersectionRect   | DOMRectReadOnly         | Intersection rectangle           |
| target             | Element                 | Observed element                 |
| time               | number                  | Event timestamp                  |
| event              | "enter" \| "exit"       | Event type                       |

---

## 🧑‍💻 Examples

### Basic Usage

#### Observe Elements by Selector

```js
const elements = new InView(".css-selector");

elements.on("enter", (event) => {
	// Element entered viewport
});

elements.on("exit", (event) => {
	// Element exited viewport
});
```

---

### Advanced Configuration

```js
const element = new InView({
	selector: ".css-selector",
	delay: 100, // ms delay before callback
	precision: "high", // "low" | "medium" | "high"
	single: true, // Observe only the first match
});
```

---

### TypeScript Example

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
	// Handle enter event
});
```

---

### Vue.js Integration

InView provides Vue directives for easy integration.

#### Register Directives Globally

```js
import { createInViewDirective, createOutViewDirective } from "@opuu/inview/vue";
const app = createApp(App);

app.directive("inview", createInViewDirective({ delay: 100, precision: "high", single: true }));
app.directive("outview", createOutViewDirective());
```

#### Usage in Templates

```html
<template>
	<div v-inview="onEnterHandler" v-outview="onExitHandler">
		<!-- Content -->
	</div>
</template>
```

> You can also register directives locally within a component.

---

## 🌐 Browser Support

InView uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), supported by all modern browsers.  
[See browser compatibility](https://caniuse.com/intersectionobserver).

---

## 📄 License

MIT License

---

## 👤 Author

[Obaydur Rahman](https://opu.rocks)

---

## 🔗 References

- [Intersection Observer API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Browser Support: caniuse.com](https://caniuse.com/intersectionobserver)
