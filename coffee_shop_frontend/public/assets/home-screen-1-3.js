(function() {
  // Navigation handling
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      navItems.forEach(nav => nav.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');
    });
  });

  // Favorite button handling
  const favButtons = document.querySelectorAll('.favorite-btn');
  favButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Toggle favorite state
      btn.classList.toggle('active');
    });
  });

  // Search bar handling
  const searchBar = document.querySelector('.search-bar');
  if (searchBar) {
    searchBar.addEventListener('click', () => {
      // Placeholder: In a real app, this would focus/open search
      console.log('Search clicked');
    });
  }

  // Filter button handling
  const filterBtn = document.querySelector('.filter-btn');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      // Placeholder: In a real app, this would open filter options
      console.log('Filter clicked');
    });
  }

  // Coffee card handling
  const coffeeCards = document.querySelectorAll('.coffee-card');
  coffeeCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h2').textContent;
      // Placeholder: In a real app, this would navigate to detail view
      console.log('Navigate to:', title);
    });
  });
})();
