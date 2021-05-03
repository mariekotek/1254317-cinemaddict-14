import NoFilmsView from '../view/films-list-empty.js';
import MainMenuView from '../view/main-menu.js';
import MainSortView from '../view/main-sort.js';
import MovieBoardView from '../view/movie-board.js';
import FilmCardView from '../view/movie-card.js';
import FilmPopupView from '../view/info-popup.js';
import UserRankView from '../view/user-rank.js';
import ShowMoreButtonView from '../view/show-more-btn.js';

import {render, RenderPosition} from '../utils/render';
import {generateFilmCard} from "../mock/moviecard-mock";

const CARDS_NUMBER_PER_STEP = 4;
const films = new Array(15).fill().map(() => generateFilmCard());

export default class MovieList {
  constructor(siteMainElement) {
    this._siteMainElement = siteMainElement;

    this._films = films;

    this._mainMenuComponent = new MainMenuView();
    this._mainSortComponent = new MainSortView();
    this._noFilmsComponent = new NoFilmsView();
    this._movieBoardComponent = new MovieBoardView();
    this._filmCardComponent = new FilmCardView();
    this._popupComponent = new FilmPopupView();
    this._filmCardComponent = new FilmCardView();
    this._userRankComponent = new UserRankView();
    this._showMoreBtn = new ShowMoreButtonView();
  }

  init(films) {
    render(this._siteMainElement, this._movieBoardComponent, RenderPosition.BEFOREEND);
    this._renderBoard();

  }

  _renderMainMenu() {
    render(this._siteMainElement, this._mainMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._siteMainElement, this._mainSortComponent, RenderPosition.BEFOREEND);
  }

  _renderUserRank() {
  render(this._movieBoardComponent, this._userRankComponent, RenderPosition.BEFOREEND);
  }

  _renderCard() {
    render(this._movieBoardComponent, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderCards() {
    this._films.forEach((item, index) => {
      index < n && this._renderCard();
    });
  }

  _renderNoFilms() {
      render(place, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    if (films.length > CARDS_NUMBER_PER_STEP) {
    let renderedFilmCount = CARDS_NUMBER_PER_STEP;
    render(this._movieBoardComponent, this._showMoreBtn, RenderPosition.BEFOREEND);
    showMoreButton.setClickHandler(() => {
      films
        .slice(renderedFilmCount, renderedFilmCount + CARDS_NUMBER_PER_STEP)
        .forEach(() => renderCard(CARD, this._movieBoardComponent));
      renderedFilmCount += CARDS_NUMBER_PER_STEP;
      if (renderedFilmCount >= films.length) {
        this._showMoreBtn.removeElement();
      }
    });
}
  }

  _renderBoard() {
  if (films.length === 0) {
    this._renderNoFilms();
    return;
  }
  this._renderMainMenu();
  this._renderSort();
  this._renderUserRank();
  this._renderCards();
  this._renderLoadMoreButton();
  }
}
