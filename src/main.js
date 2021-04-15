import {createMainMenuTemplate} from './view/main-menu.js';
import {createMovieList} from './view/movie-card.js';
import {createMovieCardTemplate} from './view/movie-card.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createShowMoreButton} from './view/show-more-btn.js';
import {createMovieInfoPopup} from './view/info-popup.js';
import {createCommentTemplate} from './view/comment.js';
import {generateMovieCard} from './mock/moviecard-mock.js';
import {generateComment} from './mock/comment-mock.js';
import {generateFilters} from './mock/main-menu-mock.js';

const CARDS_NUMBER = 5;
const CARDS_NUMBER_PER_STEP = 4;
const TOP_RATED = 2;
const MOST_COMMENTED = 2;
const COMMENTS_NUMBER = 4;

//Массив объектов
const films = new Array(15).fill().map(() => generateMovieCard());
const filters = generateFilters(films);

// Вставляет HTML-код в указанное место
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
// Рендерит сортировку и фильтры
render(siteMainElement, createMainMenuTemplate(filters), 'afterbegin');

const siteHeaderElement = document.querySelector('.header');
//Рендерит аватар и звание пользователя
render(siteHeaderElement, createUserRankTemplate(), 'beforeend');

//Рендерит контейнер для списка фильмов
render(siteMainElement, createMovieList(), 'beforeend');

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
    render(place, createMovieCardTemplate(films[i]),'beforeend');
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
  render(movieListContainer, createShowMoreButton(), 'beforeend');

  const showMoreButton = movieListContainer.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    alert('Works!');
  });
}


//Рендерит попап с информацией о фильме
const moviePopupList = new Array(1).fill().map(() => generateMovieCard());
const comments = new Array(10).fill().map(() => generateComment());
render(siteFooterElement, createMovieInfoPopup(moviePopupList[0]), 'afterend');

const popupElement = document.querySelector('.film-details');
const commentsList = popupElement.querySelector('.film-details__comments-list');

//Рендерит комментарии фильмов i количество раз
const renderComment = (n) => {
  for (let i = 0; i < n; i++) {
    render(commentsList, createCommentTemplate(comments[i]),'beforeend');
  }
};
renderComment(COMMENTS_NUMBER);

