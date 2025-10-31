export function offsetTop(node, { value, update: updateFn }) {
  function update() {
    value(node.offsetTop);
  }

  update();
  updateFn(update);

  window.addEventListener('resize', update);

  return {
    destroy() {
      window.removeEventListener('resize', update);
    },
  };
}
