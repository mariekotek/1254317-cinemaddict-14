import FilmCardView from '../view/movie-card.js';
import FilmPopupView from '../view/info-popup.js';
import {UserAction, UpdateType} from '../utils/user.js';

import {render, RenderPosition, remove, onEscKeyDown} from '../utils/render';
//import {generateFilmCard} from '../mock/moviecard-mock';

const Mode = {
  CARD: 'CARD',
  POPUP: 'POPUP',
};

export default class Movie {
  constructor(movieBoardComponent, cardChangeCallback, closePopupsCallback, clearFilmsCallback, renderCardsCallback) {
    this._movieBoardComponent = movieBoardComponent;
    this._closePopupsCallback = closePopupsCallback;
    this._cardChangeCallback = cardChangeCallback;
    this._clearFilmsCallback = clearFilmsCallback;
    this._renderCardsCallback = renderCardsCallback;

    // const films = new Array(15).fill().map(() => generateFilmCard());
    // this._filmCardComponent = null;
    // this._popupComponent = null;
    this._mode = Mode.CARD;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._handleOnEscKeyDown = this._handleOnEscKeyDown.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(film, comments, changeData) {
    this._film = film;
    this._comments = comments;
    this._changeData = changeData;

    // const prevFilmCardComponent = this._filmCardComponent;
    // const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(film);


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
    this._popupComponent = new FilmPopupView(film, this._handleWatchlistClick, this._handleFavoriteClick, this._handleWatchedClick);
    this._filmCardComponent.setEditClickHandler(this._handleOpenPopupClick);
    this._popupComponent.setEditClickHandler(this._handleClosePopupClick);
    // this._popupComponent.setDeleteCommentHandler(this._handleDeleteComment);
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
    this._popupComponent.setWatchedClick(this._handleWatchedClick);
  }

  _handleClosePopupClick() {
    document.querySelector('body').classList.remove('hide-overflow');
    this._movieBoardComponent.removeChild(this._popupComponent.getElement());
    // this._clearFilmsCallback();
    // this._renderCardsCallback();
  }

  _handleOnEscKeyDown(evt) {
    if (evt && (evt.key === 'Escape' || evt.key === 'Esc')) {
      evt.preventDefault();
      this._handleClosePopupClick();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  }

  _handleWatchlistClick() {
    this._cardChangeCallback(
      Object.assign(
        {},
        this._film,
        {
          isInWatchList: !this._film.isInWatchList,
        },
      ),
    );
  }
  _handleWatchedClick() {
    this._cardChangeCallback(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }
  _handleFavoriteClick() {
    this._cardChangeCallback(
      Object.assign(
        {},
        this._film,
        {
          isFavourite: !this._film.isFavourite,
        },
      ),
    );
  }

  _handleDeleteClick(data, commentId) {
    const commentIndex = data.film.comments.findIndex((comment) => comment === Number(commentId));

    data.film.comments = [
      ...data.film.comments.slice(0, commentIndex),
      ...data.film.comments.slice(commentIndex + 1),
    ];

    this._popupComponent.reset(data.film, data.filmComments);

    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.MINOR,
      data.film,
      data.filmComments[commentId - 1],
    );
  }


}
