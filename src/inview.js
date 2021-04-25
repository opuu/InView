class InView {
  constructor(selector) {
    if (selector === "document" || selector === "window") {
      console.error("Opuu: Invalid selector.");
    } else {
      this.items = document.querySelectorAll(selector);
    }

    return this;
  }

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
               * Create output object
               */
              if (
                (event === "enter" && entry.intersectionRatio > 0) ||
                (event === "exit" && entry.intersectionRatio === 0)
              ) {
                let values = {
                  percentage: entry.intersectionRatio * 100,
                  target: entry.target,
                  time: entry.time,
                  event: event,
                };
                callback(values);
              }
            });
          },
          {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          }
        );

        this.items.forEach((item) => {
          observer.observe(item);
        });
      }
    } else {
      console.error("Opuu: Event name " + event + " is invalid.");
    }

    return this;
  }
}
