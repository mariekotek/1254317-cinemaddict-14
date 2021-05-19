import {generateComment} from '../mock/comment-mock';
import {getRandomInteger, generateRandom, generateId, getRandomNumber} from '../utils/get_random.js';
import SmartView from './smart.js';
import {UserAction} from '../utils/user.js';

const emojis = ['smile','sleeping','puke','angry'];
const comments = new Array(4).fill().map(() => generateComment());
const createCommentTemplate = (comments) => {
// const {emotion, message, author, date} = comment;
  return comments.map((comment) =>
    `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${comment.emotion}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${comment.date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`).join('');
};

const createFilmPopup = (film) => {
  const {poster, age, name, originalName, rate, director, actors, writers, releaseDate, runtime, country, genre,
    description, isFavourite, isWatched, isInWatchList} = film;
  return `<section class="film-details" id="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
          <p class="film-details__age">${age}</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${name}</h3>
              <p class="film-details__title-original">${originalName}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${rate}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
                <span class="film-details__genre">${genre}</span>
                <span class="film-details__genre">${genre}</span></td>
            </tr>
          </table>
          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
        <input type="checkbox" ${isInWatchList && 'checked'} class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
        <input type="checkbox" ${isWatched && 'checked'} class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
        <input type="checkbox" ${isFavourite && 'checked'} class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
        <ul class="film-details__comments-list">
        ${createCommentTemplate(comments)}
        </ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmPopup extends SmartView {
  constructor(film, _handleWatchlistClick, _handleFavoriteClick, _handleWatchedClick) {
    super();
    this._data = FilmPopup.parseDataToState(film, comments);
    this._film = this._data.film;
    this._comments = this._data.comments;
    this._handleWatchlistClick = _handleWatchlistClick;
    this._handleFavoriteClick = _handleFavoriteClick;
    this._handleWatchedClick = _handleWatchedClick;

    this._editClickHandler = this._editClickHandler.bind(this);
    this.setWatchedClick = this.setWatchedClick.bind(this);
    this.setFavouritesClick = this.setFavouritesClick.bind(this);
    this.setInWatchListClick = this.setInWatchListClick.bind(this);
    this._setCommentInputHandler = this._setCommentInputHandler.bind(this);
    this._handleSetWatchedClick = this._handleSetWatchedClick.bind(this);
    this._handlerEmojiChoose = this._handlerEmojiChoose.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);

    this._callback = {};
  }

  getTemplate() {
    return createFilmPopup(this._data);
  }

  _reset(film, comments) {
    this.updateData(
      FilmPopup.parseStateToData(film, comments),
    );
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._editClickHandler);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._handlerEmojiChoose);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._commentInputHandler);
    // this.getElement().addEventListener('keydown', this._handlerCommentSend);
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click', this._deleteCommentHandler);
  }

  _handleSetWatchedClick(evt) {
    evt.preventDefault();
    this._callback._handleWatchedClick();
  }

  setWatchedClick(callback) {
    this._callback._handleWatchedClick = callback;
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('click', this._handleSetWatchedClick);
  }

  setFavouritesClick(callback) {
    this._callback.setFavouritesClick = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._handleFavoriteClick);
  }

  setInWatchListClick(callback) {
    this._callback.setInWatchListClick = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._handleWatchlistClick);
  }

  _handlerEmojiChoose(evt) {
      evt.preventDefault();
      const currentScroll = document.querySelector('.film-details').scrollTop;
      this.updateData({
        emoji: evt.target.value,
      });
    document.querySelector('.film-details').scrollTo(0, currentScroll);
  }

  _setCommentInputHandler(callback) {
    this._callback.sendComment = callback;
    document.addEventListener('keydown', this._sendCommentHandler);
  }

  _setDeleteCommentHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelectorAll('.film-details__comment-delete').forEach((deleteButton) => deleteButton.addEventListener('click', this._deleteCommentHandler));
  }

  _commentInputHandler(evt) {
    const currentScroll = this.getElement().scrollTop;
    if (this._data.emoji === '' || this._data.userComment === '') {
      throw new Error('Can`t add comment without text and emotion');
    }
    this._callback.sendComment(evt, FilmPopup.parseStateToData(this._data, UserAction.ADD_COMMENT));
    this.getElement().scrollTo(0, currentScroll);
  }

  _deleteCommentHandler(evt) {
    evt.preventDefault();
    const currentScroll = this.getElement().scrollTop;
    this._callback.deleteClick(FilmPopup.parseStateToData(this._data, UserAction.DELETE_COMMENT), evt.target.id);
    this.getElement().scrollTo(0, currentScroll);
  }

  static parseDataToState(filmData, filmCommentsData) {
    return {
      film: Object.assign({}, filmData),
      filmComments: filmCommentsData.slice(),
      emoji: '',
      userComment: '',
    };
  }

  static parseStateToData(data, userActionType) {
    data = Object.assign({}, data);

    switch(userActionType) {
      case UserAction.ADD_COMMENT:
        data.filmComments.push({
          id: generateId(),
          text: data.userComment,
          emotion: data.emoji,
          // author: generateRandom(NAMES),
          // date: getCurrentDate(),
        });
        delete data.emoji;
        delete data.userComment;
        break;
      case UserAction.DELETE_COMMENT:
        break;
    }
    return data;
  }

}
