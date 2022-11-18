/**
 * InView
 *
 * Check if element is visible in viewport
 */
export default class InView {
  /**
   * InView: Elements to observe
   *
   * @param {String} selector
   * @returns {Object} this object to chain .on() methods.
   */
  constructor(selector) {
    if (selector === "document" || selector === "window") {
      console.error("InView: Invalid selector.");
    } else {
      this.items = document.querySelectorAll(selector);
    }

    this.paused = false;

    this.delay = 0;

    this.threshold = [];
    for (let i = 0; i <= 1; i += 0.01) {
      this.threshold.push(i);
    }

    return this;
  }

  /**
   * InView: Pause observing
   * @returns {Object} this object to chain .on() methods.
   * @example
   * new InView(".selector").pause();
   * new InView(".selector").pause().on("enter", () => {});
   * new InView(".selector").pause().on("exit", () => {});
   */
  pause() {
    this.paused = true;
    return this;
  }

  /**
   * InView: Resume observing
   * @returns {Object} this object to chain .on() methods.
   * @example
   * new InView(".selector").pause().resume().on("enter", () => {});
   * new InView(".selector").pause().resume().on("exit", () => {});
   */
  resume() {
    this.paused = false;
    return this;
  }

  /**
   * InView: Set delay
   * @param {Number} delay
   * @returns {Object} this object to chain .on() methods.
   * @example
   * new InView(".selector").delay(1000).on("enter", () => {});
   * new InView(".selector").delay(1000).on("exit", () => {});
   */
  setDelay(delay) {
    this.delay = delay;
    return this;
  }

  /**
   * InView: Event Listener
   * @param {String} event name of the event (enter or exit)
   * @param {Function} callback callback function with event parameter
   * @returns {Object} return this object to chain .on() methods.
   * @example
   * new InView(".selector").on("enter", () => {});
   * new InView(".selector").on("exit", () => {});
   * new InView(".selector").on("enter", () => {}).on("exit", () => {});
   */
  on(event, callback) {
    if (event === "enter" || event === "exit") {
      /**
       * Check if IntersectionOberver is available
       */
      if ("IntersectionObserver" in window) {
        /**
         * New observer to check for each items position
         */
        var observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              /**
               * Determine if element exited or entered the viewport
               */
              if (
                (event === "enter" && entry.intersectionRatio > 0) ||
                (event === "exit" && entry.intersectionRatio === 0)
              ) {
                /**
                 * Create output object
                 */
                let e = {
                  percentage: entry.intersectionRatio * 100,
                  rootBounds: entry.rootBounds,
                  boundingClientRect: entry.boundingClientRect,
                  intersectionRect: entry.intersectionRect,
                  target: entry.target,
                  time: entry.time,
                  event: event,
                };

                /**
                 * Call the callback function if not paused and if delay is over
                 */
                if (!this.paused) {
                  if (this.delay > 0) {
                    setTimeout(() => {
                      callback(e);
                    }, this.delay);
                  } else {
                    callback(e);
                  }
                }
              }
            });
          },
          {
            threshold: this.threshold,
          }
        );

        this.items.forEach((item) => {
          // observe each item
          observer.observe(item);
        });
      } else {
        console.error("InView: IntersectionObserver not supported.");
      }
    } else {
      console.error("InView: Event name " + event + " is invalid.");
    }

    return this;
  }
}
