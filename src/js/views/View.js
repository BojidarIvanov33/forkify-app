import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  _message;
  render(data, render = true) {
    if (!data || data.length === 0) return this.renderError();
    this._data = data;
    const markUp = this._generateMarkUp();
    if (!render) return markUp;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderError(message = this._errMessage) {
    const markUp = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
  renderMessage(message = this._message) {
    const markUp = `      <div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${
            message
              ? message
              : 'Start by searching for a recipe or an ingredient. Have fun!'
          }</p>
        </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
  renderSpinner() {
    const markUp = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
  update(data) {
    this._data = data;

    const newMarkUp = this._generateMarkUp();
    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = currElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        {
          curEl.textContent = newEl.textContent;
        }
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
    // this._parentEl.insertAdjacentHTML('afterbegin', [currElements]);
  }
}
