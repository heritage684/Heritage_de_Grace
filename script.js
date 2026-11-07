const cards = [...document.querySelectorAll('.book-card')];
const filters = [...document.querySelectorAll('.filter')];
const search = document.querySelector('#search');
const noResults = document.querySelector('#no-results');
let selectedCategory = 'all';

function updateCards() {
  const query = search.value.trim().toLocaleLowerCase('fr');
  let visibleCount = 0;

  for (const card of cards) {
    const matchesCategory = selectedCategory === 'all' || card.dataset.category === selectedCategory;
    const matchesSearch = card.dataset.search.toLocaleLowerCase('fr').includes(query);
    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;
    if (visible) visibleCount++;
  }

  noResults.hidden = visibleCount > 0;
}

for (const button of filters) {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.filter;
    for (const filter of filters) {
      const isActive = filter === button;
      filter.classList.toggle('active', isActive);
      filter.setAttribute('aria-pressed', String(isActive));
    }
    updateCards();
  });
}

search.addEventListener('input', updateCards);
