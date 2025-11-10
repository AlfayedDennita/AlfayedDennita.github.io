export function offsetTop(node, { update: change, getUpdateFn }) {
  function update() {
    change(node.offsetTop);
  }

  update();
  getUpdateFn(update);

  window.addEventListener('resize', update);

  return {
    destroy() {
      window.removeEventListener('resize', update);
    },
  };
}
