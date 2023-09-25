import View from './View';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errMessage = 'No such a recipe! Please try with another one';
  _generateMarkUp() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultView();
//preview__link--active
// <div class="preview__user-generated">
//   <svg>
//        <use href="${icons}#icon-user"></use>
// </svg>
//</div>;
