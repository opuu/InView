import { ObjectDirective } from 'vue';
import { InViewConfig } from './inview';
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
export declare function createInViewDirective(globalConfig?: Partial<InViewConfig>): ObjectDirective;
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
export declare function createOutViewDirective(globalConfig?: Partial<InViewConfig>): ObjectDirective;
