import FilmCardView from '../view/movie-card.js';
import FilmPopupView from '../view/info-popup.js';

import {render, RenderPosition, remove} from '../utils/render';
import {generateFilmCard} from "../mock/moviecard-mock";

export default class Movie {
  constructor(siteMainElement, siteFooterElement) {
    this._siteMainElement = siteMainElement;
    this._siteFooterElement = siteFooterElement;
    const films = new Array(15).fill().map(() => generateFilmCard());
    this._filmCardComponent = null;
    this._popupComponent = null;

    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._onEscKeyDownHandle = this._onEscKeyDownHandle.bind(this);



  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;
    this._filmCardComponent = new FilmCardView(film).getElement();
    this._popupComponent = new FilmPopupView(film, this._comments);
    this._filmCardComponent.this._handleOpenPopup();

  }

    _handleOpenPopup() {
        document.querySelector('body').classList.add('hide-overflow');
        document.addEventListener('keydown', onEscKeyDown);
        this._filmCardComponent.setEditClickHandler(this._filmCardComponent.openPopup());
        render(this._siteFooterElement, this._popupComponent.getElement(), RenderPosition.BEFOREEND);
      }

      _handleClosePopup() {
        document.querySelector('body').classList.remove('hide-overflow');
        document.removeEventListener('keydown', onEscKeyDown);
        this._siteFooterElement.removeChild(this._popupComponent.getElement());
      }

     _onEscKeyDownHandle(evt) {
        if (evt && (evt.key === 'Escape' || evt.key === 'Esc')) {
          evt.preventDefault();
          this.closePopup();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      }
}
