const cards = [...document.querySelectorAll('.book-card')];
const filters = [...document.querySelectorAll('.filter')];
const searches = [...document.querySelectorAll('input[type="search"]')];
const noResults = document.querySelector('#no-results');
let selectedCategory = 'all';

function updateCards(source) {
  const query = source.value.trim().toLocaleLowerCase('fr');
  for (const search of searches) {
    if (search !== source) search.value = source.value;
  }
  let visibleCount = 0;

  for (const card of cards) {
    const matchesCategory = selectedCategory === 'all' || card.dataset.category === selectedCategory;
    const matchesSearch = card.dataset.search.toLocaleLowerCase('fr').includes(query);
    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;
    if (visible) visibleCount++;
  }

  if (noResults) noResults.hidden = visibleCount > 0;
}

for (const button of filters) {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.filter;
    for (const filter of filters) {
      const isActive = filter === button;
      filter.classList.toggle('active', isActive);
      filter.setAttribute('aria-pressed', String(isActive));
    }
    updateCards(searches[0]);
  });
}

for (const search of searches) {
  search.addEventListener('input', () => updateCards(search));
}

const initialQuery = new URLSearchParams(window.location.search).get('q');
if (initialQuery && searches.length) {
  searches[0].value = initialQuery;
  updateCards(searches[0]);
}
