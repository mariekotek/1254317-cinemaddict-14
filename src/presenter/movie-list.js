import NoFilmsView from '../view/films-list-empty.js';
import MainMenuView from '../view/main-menu.js';
import MainSortView from '../view/main-sort.js';
import MovieBoardView from '../view/movie-board.js';
import UserRankView from '../view/user-rank.js';
import ShowMoreButtonView from '../view/show-more-btn.js';
import MoviePresenter from './movie.js';
import {SortType, sortFilmsDate, sortFilmsRate} from '../utils/sort.js';

import {render, RenderPosition, remove} from '../utils/render.js';
// import {updateItem} from '../utils/create_element.js';
import {generateFilmCard} from '../mock/moviecard-mock';
import {updateItem} from '../utils/create_element';

const CARDS_NUMBER_PER_STEP = 5;
const films = new Array(15).fill().map(() => generateFilmCard());

export default class MovieList {
  constructor(siteMainElement, siteHeaderElement, filmsModel) {
    this._siteMainElement = siteMainElement;
    this._siteHeaderElement = siteHeaderElement;
    this._filmsModel = filmsModel;

    this._renderedFilmCount = CARDS_NUMBER_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._films = films;
    //this._moviePresenter = new MoviePresenter(this._movieBoardComponent, this._closePopups);
    this._moviePresenters = {};

    this._mainMenuComponent = new MainMenuView().getElement();
    this._mainSortComponent = new MainSortView();
    this._noFilmsComponent = new NoFilmsView().getElement();
    this._movieBoardComponent = new MovieBoardView().getElement();
    this._userRankComponent = new UserRankView().getElement();
    this._showMoreBtn = new ShowMoreButtonView();

    this._movieListContainer = this._movieBoardComponent.querySelector('.films-list');

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    render(this._siteMainElement, this._movieBoardComponent, RenderPosition.AFTERBEGIN);
    this._renderBoard();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }


  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmsDate);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmsRate);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _clearFilms() {
    // console.log(this);
    Object
      .values(this._moviePresenters)
      .forEach((presenter) => presenter.destroy());
    this._renderedFilmCount = CARDS_NUMBER_PER_STEP;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilms();
    this._renderCards();
  }

  _closePopups() {
    document.querySelectorAll('.film-details').forEach((el) => el.remove());
  }

  _renderMainMenu() {
    render(this._siteMainElement, this._mainMenuComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._siteMainElement, this._mainSortComponent.getElement(), RenderPosition.AFTERBEGIN);
    this._mainSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderUserRank() {
    render(this._siteHeaderElement, this._userRankComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    render(this._movieBoardComponent, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _handleCardChange(updatedCard) {
    this._films = updateItem(this._films, updatedCard);
    this._clearFilms();
    this._renderCards();
  }

  _renderCard(film) {
    const moviePresenter = new MoviePresenter(
      this._movieBoardComponent,
      this._handleCardChange,
      this._closePopups,
      this._clearFilms,
      this._renderCards,
    );
    moviePresenter.init(film);
    this._moviePresenters[film.id] = moviePresenter;
  }

  _renderCards() {
    this._films.slice().forEach((item, index) => {
      index < 5 && this._renderCard(item);
    });
  }

  _handleShowMoreButtonClick() {
    this._renderCards(this._renderedFilmCount, this._renderedFilmCount + CARDS_NUMBER_PER_STEP);
    this._renderedFilmCount += CARDS_NUMBER_PER_STEP;
    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreBtn);
    }
  }

  _renderShowMoreButton() {
    render(this._movieListContainer, this._showMoreBtn.getElement(), RenderPosition.BEFOREEND);
    this._showMoreBtn.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderBoard() {
    this._renderUserRank();
    this._renderSort();
    this._renderMainMenu();
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderShowMoreButton();
    this._renderCards();
  }
}
