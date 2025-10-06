(function() {
  // Global app namespace
  window.CafeApp = window.CafeApp || {};
  // Utilities: focus ring for keyboard users
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('using-keyboard');
    }
  });
  document.addEventListener('mousedown', function () {
    document.documentElement.classList.remove('using-keyboard');
  });
})();
