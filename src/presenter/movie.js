import FilmCardView from '../view/movie-card.js';
import FilmPopupView from '../view/info-popup.js';

import {render, RenderPosition, remove, onEscKeyDown} from '../utils/render';
//import {generateFilmCard} from '../mock/moviecard-mock';

const Mode = {
  CARD: 'CARD',
  POPUP: 'POPUP',
};

export default class Movie {
  constructor(movieBoardComponent, closePopupsCallback, changeMode) {
    this._movieBoardComponent = movieBoardComponent;
    this._closePopupsCallback = closePopupsCallback;
    this._changeMode = changeMode;

    // const films = new Array(15).fill().map(() => generateFilmCard());
    // this._filmCardComponent = null;
    // this._popupComponent = null;
    this._mode = Mode.CARD;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._handleOnEscKeyDown = this._handleOnEscKeyDown.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    // const prevFilmCardComponent = this._filmCardComponent;
    // const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new FilmPopupView(film, this._comments);

    render(this._movieBoardComponent, this._filmCardComponent.getElement(), RenderPosition.AFTERBEGIN);
    // if (prevFilmCardComponent === null) {
    //   render(this._movieBoardComponent, this._filmCardComponent.getElement(), RenderPosition.AFTERBEGIN);
    //   return;
    // }
    //
    // if (this._movieBoardComponent.contains(prevFilmCardComponent.getElement())) {
    //   replace(this._filmCardComponent, prevFilmCardComponent);
    // }
    //
    // remove(prevFilmCardComponent);

    this._filmCardComponent.setEditClickHandler(this._handleOpenPopupClick);
    this._popupComponent.setEditClickHandler(this._handleClosePopupClick);

    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }


  _handleOpenPopupClick() {
    this._closePopupsCallback();
    document.querySelector('body').classList.add('hide-overflow');
    document.addEventListener('keydown', this._handleOnEscKeyDown);
    render(this._movieBoardComponent, this._popupComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _handleClosePopupClick() {
    document.querySelector('body').classList.remove('hide-overflow');
    this._movieBoardComponent.removeChild(this._popupComponent.getElement());
  }

  _handleOnEscKeyDown(evt) {
    if (evt && (evt.key === 'Escape' || evt.key === 'Esc')) {
      evt.preventDefault();
      this._handleClosePopupClick();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  }

  _handleWatchlistClick() {

  }
  _handleWatchedClick() {

  }
  _handleFavoriteClick() {

  }
}
