export function trackOffsetTop(
  setOffsetTop = () => undefined,
  getUpdate = () => undefined
) {
  let updateTimeout;

  return (node) => {
    function update() {
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => setOffsetTop(node.offsetTop), 100);
    }

    update();
    getUpdate(update);

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  };
}
