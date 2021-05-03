import FilmCardView from '../view/movie-card.js';
import FilmPopupView from '../view/info-popup.js';

import {render, RenderPosition} from '../utils/render';
import MainMenuView from "../view/main-menu";
import MainSortView from "../view/main-sort";
import NoFilmsView from "../view/films-list-empty";
import MovieBoardView from "../view/movie-board";
import UserRankView from "../view/user-rank";
import ShowMoreButtonView from "../view/show-more-btn";

export default class Movie {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._filmCardComponent = null;
    this._popupComponent = null;
  }

  init(films) {
    this._boardTasks = films.slice();
    this._filmCardComponent = new FilmCardView();
    this._popupComponent = new FilmPopupView();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }


}
