import MainMenuView from './view/main-menu.js';
import MainSortView from './view/main-sort.js';
import MovieBoardView from './view/movie-board.js';
import FilmCardView from './view/movie-card.js';
import UserRankView from './view/user-rank.js';
import ShowMoreButtonView from './view/show-more-btn.js';
import {createMovieInfoPopup} from './view/info-popup.js';
import CommentView from './view/comment.js';
import {generateFilmCard} from './mock/moviecard-mock.js';
import {generateComment} from './mock/comment-mock.js';
import {generateFilters} from './mock/main-menu-mock.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

const CARDS_NUMBER = 5;
const CARDS_NUMBER_PER_STEP = 4;
const TOP_RATED = 2;
const MOST_COMMENTED = 2;
const COMMENTS_NUMBER = 4;

//Массив объектов
const films = new Array(15).fill().map(() => generateFilmCard());
const filters = generateFilters(films);

const siteMainElement = document.querySelector('.main');
// Рендерит сортировку и фильтры
renderElement(siteMainElement, new MainMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new MainSortView().getElement(), RenderPosition.BEFOREEND);

const siteHeaderElement = document.querySelector('.header');
//Рендерит аватар и звание пользователя
renderElement(siteHeaderElement, new UserRankView().getElement(), RenderPosition.BEFOREEND);

//Рендерит контейнер для списка фильмов
const movieBoardComponent = new MovieBoardView;
renderElement(siteMainElement, movieBoardComponent.getElement(), RenderPosition.BEFOREEND);

//Секции/контейнеры
const filmsSection = siteMainElement.querySelector('.films');
const movieListContainer = filmsSection.querySelector('.films-list__container');
const mostCommentedSection = filmsSection.querySelector('.films-list__most-commented');
const mostCommentedSectionContainer = mostCommentedSection.querySelector('.films-list__container');
const topRatedSection = filmsSection.querySelector('.films-list__top-rated');
const topRatedSectionContainer = topRatedSection.querySelector('.films-list__container');
const siteFooterElement = document.querySelector('.footer');

//Рендерит карточки фильмов i количество раз
const renderCard = (n, place) => {
  for (let i = 0; i < n; i++) {
    renderElement(place, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
  }
};

renderCard(CARDS_NUMBER, movieListContainer);
renderCard(MOST_COMMENTED, mostCommentedSectionContainer);
renderCard(TOP_RATED, topRatedSectionContainer);

//Кнопка SHOW MORE

/**
if (films.length > CARDS_NUMBER_PER_STEP) {
  let shownFilmsCount = CARDS_NUMBER_PER_STEP;

  render(movieListContainer, createShowMoreButton());

  const showMoreButton = movieListContainer.querySelector('.films-list__show-more');

  const onShowMoreButtonClick = (evt) => {
    evt.preventDefault();

    films
      .slice(shownFilmsCount, shownFilmsCount + CARDS_NUMBER_PER_STEP)
      .forEach((film) => render(movieListContainer, createMovieCardTemplate(films[0])));
    shownFilmsCount += CARDS_NUMBER_PER_STEP;

    if (shownFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  };

  showMoreButton.addEventListener('click', onShowMoreButtonClick);
}
**/

if (films.length > CARDS_NUMBER_PER_STEP) {
  renderElement(movieListContainer, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = movieListContainer.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    alert('Works!');
  });
}

/**
//Рендерит попап с информацией о фильме
const moviePopupList = new Array(1).fill().map(() => generateMovieCard());
renderTemplate(siteFooterElement, createMovieInfoPopup(moviePopupList[0]), 'afterend');

const popupElement = document.querySelector('.film-details');
const commentsList = popupElement.querySelector('.film-details__comments-list');

//Рендерит комментарии фильмов i количество раз
const comments = new Array(10).fill().map(() => generateComment());
const renderComment = (n) => {
  for (let i = 0; i < n; i++) {
    renderElement(commentsList, new CommentView(comments).getElement(), RenderPosition.BEFOREEND);
  }
};*/

