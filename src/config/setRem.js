
(function setttt() {
  const docElem = document.documentElement;

  function setRemUnit() {
    const viewWidth = docElem.getBoundingClientRect().width || window.innerWidth || docElem.clientWidth;
    const rem = viewWidth / 10;
    docElem.style.fontSize = rem + 'px';
  }

  setRemUnit();

  window.addEventListener('resize', setRemUnit);
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      setRemUnit();
    }
  });
})();
