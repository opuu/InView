import type { DirectiveBinding, ObjectDirective } from "vue";
import type { InViewConfig, InViewEvent } from "./inview";
import InView from "./inview";

/**
 * Extended HTMLElement interface to attach InView instance properties.
 */
interface HTMLElementWithInView extends HTMLElement {
	__inviewInstance?: InView;
	__inviewUniqueClass?: string;
	__inviewListenerCount?: number;
}

/**
 * Ensure that an InView instance exists on the element.
 *
 * @param {HTMLElementWithInView} el - The HTML element to observe.
 * @param {Partial<InViewConfig>} config - Global configuration for InView.
 * @returns {InView} The InView instance associated with the element.
 *
 * Algorithm: Underlying Intersection Observer API; time complexity is O(n) per observed element.
 */
function ensureInViewInstance(el: HTMLElementWithInView, config: Partial<InViewConfig>): InView {
	if (!el.__inviewInstance) {
		// Generate a unique class for the element if not already present.
		if (!el.__inviewUniqueClass) {
			el.__inviewUniqueClass = "inview-" + Math.random().toString(36).substr(2, 9);
			el.classList.add(el.__inviewUniqueClass);
		}
		// Build the instance configuration.
		const instanceConfig: InViewConfig = {
			selector: `.${el.__inviewUniqueClass}`,
			delay: config.delay ?? 0,
			precision: config.precision ?? "medium",
			single: config.single ?? true,
		};
		el.__inviewInstance = new InView(instanceConfig);
		el.__inviewListenerCount = 0;
	}
	return el.__inviewInstance;
}

/**
 * Factory function to create the v-inview directive.
 * This directive triggers the provided callback when the element enters the viewport.
 *
 * @param {Partial<InViewConfig>} globalConfig - Global configuration for InView.
 * @returns {ObjectDirective} A Vue directive definition for handling "enter" events.
 *
 * @example
 * // In main.ts
 * import { createInViewDirective } from './inviewDirectives';
 * app.directive('inview', createInViewDirective({ delay: 100, precision: 'high' }));
 *
 * @example
 * // In component template:
 * <div v-inview="handleEnter">...</div>
 */
export function createInViewDirective(globalConfig: Partial<InViewConfig> = {}): ObjectDirective {
	return {
		/**
		 * Called when the directive is mounted on the element.
		 *
		 * @param {HTMLElement} el - The element the directive is bound to.
		 * @param {DirectiveBinding} binding - The binding object (expects a callback function as value).
		 */
		mounted(el: HTMLElement, binding: DirectiveBinding) {
			const callback = binding.value;
			if (typeof callback !== "function") {
				console.warn("[InView]: v-inview expects a function as its value.");
				return;
			}
			// Get or create the InView instance.
			const instance = ensureInViewInstance(el as HTMLElementWithInView, globalConfig);
			instance.on("enter", (event: InViewEvent) => {
				callback(event);
			});
			(el as HTMLElementWithInView).__inviewListenerCount =
				((el as HTMLElementWithInView).__inviewListenerCount || 0) + 1;
		},

		/**
		 * Called when the directive is unmounted from the element.
		 *
		 * @param {HTMLElement} el - The element the directive was bound to.
		 */
		unmounted(el: HTMLElement) {
			const element = el as HTMLElementWithInView;
			if (element.__inviewInstance) {
				element.__inviewListenerCount = (element.__inviewListenerCount || 1) - 1;
				if (element.__inviewListenerCount <= 0) {
					element.__inviewInstance.pause();
					delete element.__inviewInstance;
					delete element.__inviewListenerCount;
				}
			}
		},
	};
}

/**
 * Factory function to create the v-outview directive.
 * This directive triggers the provided callback when the element exits the viewport.
 *
 * @param {Partial<InViewConfig>} globalConfig - Global configuration for InView.
 * @returns {ObjectDirective} A Vue directive definition for handling "exit" events.
 *
 * @example
 * // In main.ts
 * import { createOutViewDirective } from './inviewDirectives';
 * app.directive('outview', createOutViewDirective({ delay: 100, precision: 'high' }));
 *
 * @example
 * // In component template:
 * // <div v-outview="handleExit">...</div>
 */
export function createOutViewDirective(globalConfig: Partial<InViewConfig> = {}): ObjectDirective {
	return {
		/**
		 * Called when the directive is mounted on the element.
		 *
		 * @param {HTMLElement} el - The element the directive is bound to.
		 * @param {DirectiveBinding} binding - The binding object (expects a callback function as value).
		 */
		mounted(el: HTMLElement, binding: DirectiveBinding) {
			const callback = binding.value;
			if (typeof callback !== "function") {
				console.warn("[InView]: v-outview expects a function as its value.");
				return;
			}
			const instance = ensureInViewInstance(el as HTMLElementWithInView, globalConfig);
			instance.on("exit", (event: InViewEvent) => {
				callback(event);
			});
			(el as HTMLElementWithInView).__inviewListenerCount =
				((el as HTMLElementWithInView).__inviewListenerCount || 0) + 1;
		},

		/**
		 * Called when the directive is unmounted from the element.
		 *
		 * @param {HTMLElement} el - The element the directive was bound to.
		 */
		unmounted(el: HTMLElement) {
			const element = el as HTMLElementWithInView;
			if (element.__inviewInstance) {
				element.__inviewListenerCount = (element.__inviewListenerCount || 1) - 1;
				if (element.__inviewListenerCount <= 0) {
					element.__inviewInstance.pause();
					delete element.__inviewInstance;
					delete element.__inviewListenerCount;
				}
			}
		},
	};
}
