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

    this.threshold = [];
    for (let i = 0; i <= 1; i += 0.01) {
      this.threshold.push(i);
    }

    return this;
  }

  /**
   * InView: Event Listener
   * @param {String} event name of the event (enter or exit)
   * @param {Function} callback callback function with event parameter
   * @returns {Object} return this object to chain .on() methods.
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
                  target: entry.target,
                  time: entry.time,
                  event: event,
                };
                callback(e);
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
      }
    } else {
      console.error("InView: Event name " + event + " is invalid.");
    }

    return this;
  }
}
