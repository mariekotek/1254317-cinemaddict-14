import {createElement} from '../utils.js';
import FilmPopupView from './info-popup.js';
import {renderTemplate} from '../utils.js';
import {render} from '../utils.js';
import {RenderPosition} from '../utils.js';
import CommentView from './comment';

const createFilmCardTemplate = (film) => {
  const {poster, name, rate, year, duration, genre, description, comments} = film;
  return `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rate}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
  openPopup() {
    render(document.querySelector('.footer'), new FilmPopupView(this._film).getElement(), RenderPosition.BEFOREEND);
    document.querySelector('body').classList.add('hide-overflow');
    //render(new FilmPopupView(this._film).getElement(), new CommentView(comments).getElement(), RenderPosition.BEFOREEND);
  }

  setClickPoster() {
    this.getElement().querySelector('.film-card__poster').addEventListener('click', () => this.openPopup());
  }

  setClickTitle() {
    this.getElement().querySelector('.film-card__title').addEventListener('click', () => this.openPopup());
  }

  setClickComments() {
    this.getElement().querySelector('.film-card__comments').addEventListener('click', () => this.openPopup());
  }

  removeElement() {
    this._element = null;
  }
}
