(function () {
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      // Placeholder: In a real app, this would navigate back
      console.log('Back button clicked');
      history.back?.();
    });
  }

  // Add-CTA buttons
  document.querySelectorAll('.add-cta').forEach(el => {
    el.addEventListener('click', () => {
      const card = el.closest('article');
      const name = card?.getAttribute('aria-label') || 'item';
      console.log('Add to cart:', name);
    });
  });
})();
