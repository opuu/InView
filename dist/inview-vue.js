import u from "./inview.js";
function o(i, e) {
  var n, t, _;
  if (!i.__inviewInstance) {
    i.__inviewUniqueClass || (i.__inviewUniqueClass = "inview-" + Math.random().toString(36).substr(2, 9), i.classList.add(i.__inviewUniqueClass));
    const s = {
      selector: `.${i.__inviewUniqueClass}`,
      delay: (n = e.delay) != null ? n : 0,
      precision: (t = e.precision) != null ? t : "medium",
      single: (_ = e.single) != null ? _ : !0
    };
    i.__inviewInstance = new u(s), i.__inviewListenerCount = 0;
  }
  return i.__inviewInstance;
}
function c(i = {}) {
  return {
    /**
     * Called when the directive is mounted on the element.
     *
     * @param {HTMLElement} el - The element the directive is bound to.
     * @param {DirectiveBinding} binding - The binding object (expects a callback function as value).
     */
    mounted(e, n) {
      const t = n.value;
      if (typeof t != "function") {
        console.warn("[InView]: v-inview expects a function as its value.");
        return;
      }
      o(e, i).on("enter", (s) => {
        t(s);
      }), e.__inviewListenerCount = (e.__inviewListenerCount || 0) + 1;
    },
    /**
     * Called when the directive is unmounted from the element.
     *
     * @param {HTMLElement} el - The element the directive was bound to.
     */
    unmounted(e) {
      const n = e;
      n.__inviewInstance && (n.__inviewListenerCount = (n.__inviewListenerCount || 1) - 1, n.__inviewListenerCount <= 0 && (n.__inviewInstance.pause(), delete n.__inviewInstance, delete n.__inviewListenerCount));
    }
  };
}
function r(i = {}) {
  return {
    /**
     * Called when the directive is mounted on the element.
     *
     * @param {HTMLElement} el - The element the directive is bound to.
     * @param {DirectiveBinding} binding - The binding object (expects a callback function as value).
     */
    mounted(e, n) {
      const t = n.value;
      if (typeof t != "function") {
        console.warn("[InView]: v-outview expects a function as its value.");
        return;
      }
      o(e, i).on("exit", (s) => {
        t(s);
      }), e.__inviewListenerCount = (e.__inviewListenerCount || 0) + 1;
    },
    /**
     * Called when the directive is unmounted from the element.
     *
     * @param {HTMLElement} el - The element the directive was bound to.
     */
    unmounted(e) {
      const n = e;
      n.__inviewInstance && (n.__inviewListenerCount = (n.__inviewListenerCount || 1) - 1, n.__inviewListenerCount <= 0 && (n.__inviewInstance.pause(), delete n.__inviewInstance, delete n.__inviewListenerCount));
    }
  };
}
export {
  c as createInViewDirective,
  r as createOutViewDirective
};
