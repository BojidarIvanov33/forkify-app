import View from './View';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (bt) {
      const btn = bt.target.closest('.btn--inline');
      if (!btn) return;

      const goTo = +btn.dataset.goto;
      handler(goTo);
    });
  }
  _generateMarkUp() {
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    if (this._data.page === 1 && numPages > 1) {
      return `<button data-goto='${
        this._data.page + 1
      }' class="btn--inline pagination__btn--next">
            <span>page ${this._data.page + 1} </span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    if (this._data.page === numPages && numPages > 1) {
      return `<button data-goto='${
        this._data.page - 1
      }' class="btn--inline pagination__btn--prev">
                                 <svg class="search__icon">
                                     <use href="${icons}#icon-arrow-left"></use>
                                 </svg>
                                     <span>page ${this._data.page - 1} </span>
                            </button>`;
    }
    if (this._data.page < numPages) {
      return `              <button data-goto='${
        this._data.page + 1
      }' class="btn--inline pagination__btn--next">
                                 <span>page ${this._data.page + 1} </span>
                                     <svg class="search__icon">
                                        <use href="${icons}#icon-arrow-right"></use>
                                 </svg>
                             </button>
                             <button data-goto='${
                               this._data.page - 1
                             }' class="btn--inline pagination__btn--prev">
                                 <svg class="search__icon">
                                    <use href="${icons}#icon-arrow-left"></use>
                                </svg>
                                    <span>page ${this._data.page - 1} </span>
                             </button>`;
    }

    return;
  }
}
export default new PaginationView();
