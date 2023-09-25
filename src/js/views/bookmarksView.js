import View from './View';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class bookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMessage = 'No bookmarks';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkUp() {
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join('');
  }
}
export default new bookmarksView();
