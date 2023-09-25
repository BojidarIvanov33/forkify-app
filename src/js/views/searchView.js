class SearchView {
  _parentEl = document.querySelector('.search');
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearSearch();
    return query;
  }
  addSearchHandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearSearch() {
    return (this._parentEl.querySelector('.search__field').value = '');
  }
}

export default new SearchView();
