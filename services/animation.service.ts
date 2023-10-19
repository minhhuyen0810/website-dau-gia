const addObserver = (el: Element, options?: any) => {
  if (!('IntersectionObserver' in window)) {
    if (options && options.cb) {
      console.log('ccalllback');
      options.cb(el);
    } else {
      el.classList.add('animation');
    }
    return;
  }
  let observer = new IntersectionObserver((entries, observer) => {
    //this takes a callback function which receives two arguments: the elemts list and the observer instance
    entries.forEach((entry) => {
      console.log('entriues', entry.isIntersecting);
      if (entry.isIntersecting) {
        if (options && options.cb) {
          options.cb(el);
        } else {
          entry.target.classList.add('animation');
        }
        observer.unobserve(entry.target);
      } else {
        console.log('not intersecting');
      }
    });
  }, options);
  observer.observe(el);
};

const scrollTrigger = (selector: string, options?: any) => {
  const nodeListElement: NodeListOf<Element> =
    document.querySelectorAll(selector);
  const elements = Array.from(nodeListElement);
  elements.forEach((el) => {
    addObserver(el, options);
  });
};

export default { scrollTrigger };
