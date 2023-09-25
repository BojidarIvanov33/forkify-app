import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './modul.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import PaginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { Modal_Close } from './config.js';
import { async } from 'regenerator-runtime';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
// if (module.hot) {
//   module.hot.accept();
// }
const show = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //spinner
    recipeView.renderSpinner();
    //Loading recipe
    await model.loadRecipe(id);

    //Rendering recipe
    recipeView.render(model.state.recipe);
    //

    ResultView.update(model.getSearchResults());
    bookmarksView.update(model.state.bookmarks);
  } catch (error) {
    recipeView.renderError(error);
  }
};
const controlSearchResults = async function () {
  try {
    ResultView.renderSpinner();

    const query = SearchView.getQuery();
    if (!query) return;
    await model.loadSearchResult(query);

    ResultView.render(model.getSearchResults());

    PaginationView.render(model.state.search);
  } catch (error) {
    recipeView.renderError(error);
  }
};
const controllPagination = function (goToPage) {
  ResultView.render(model.getSearchResults(goToPage));
  PaginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  model.updateSurvings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controllAddBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addToBookmarks(model.state.recipe);
  else model.removeBookmarks(model.state.recipe.id);

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controllBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controllAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, Modal_Close);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const initialization = function () {
  bookmarksView.addHandlerRender(controllBookmarks);
  recipeView.addHandlerRender(show);
  SearchView.addSearchHandler(controlSearchResults);
  paginationView.addHandlerClick(controllPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controllAddBookmarks);
  addRecipeView.addHandlerUpload(controllAddRecipe);
};
initialization();
