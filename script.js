// Shared behavior for index.html and project detail pages.

// Sidebar nav highlighting (index.html only, a no-op elsewhere since the
// selectors simply match nothing).
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('aside nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`aside nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = 'Light Mode';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = 'Dark Mode';
    }
  });

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
  }
} else if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Flip cards. Click or press Enter or Space to flip, and stop bubbling so clickable rows don't navigate.
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    card.classList.toggle('flipped');
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});

// Project filters. Click a chip to show only cards tagged with that type.
const filterChips = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter;
    projectCards.forEach(card => {
      const tags = (card.dataset.tags || '').split(' ');
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('is-hidden', !show);
    });
  });
});
