import {createMainMenuTemplate} from './view/main-menu.js';
import {createMovieList} from './view/movie-card.js';
import {createMovieCardTemplate} from './view/movie-card.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createShowMoreButton} from './view/show-more-btn.js';
import {createMovieInfoPopup} from './view/info-popup.js';
import {generateMovieCard} from './mock/moviecard-mock.js';
import {generateComment} from './mock/comment-mock.js';
import {generateFilters} from './mock/main-menu-mock.js';

const CARDS_NUMBER = 5;
const CARDS_NUMBER_PER_STEP = 4;
const TOP_RATED = 2;
const MOST_COMMENTED = 2;

//Массив объектов
const moviesInfo = new Array(15).fill().map(() => generateMovieCard());
const filters = generateFilters(moviesInfo);

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
    render(place, createMovieCardTemplate(moviesInfo[i]),'beforeend');
  }
};

renderCard(CARDS_NUMBER, movieListContainer);
renderCard(MOST_COMMENTED, mostCommentedSectionContainer);
renderCard(TOP_RATED, topRatedSectionContainer);

if (moviesInfo.length > CARDS_NUMBER_PER_STEP) {
  let renderedCardsCount = CARDS_NUMBER_PER_STEP;

  render(movieListContainer, createShowMoreButton(), 'beforeend');

  const showMoreButton = movieListContainer.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    moviesInfo
      .slice(renderedCardsCount, renderedCardsCount + CARDS_NUMBER_PER_STEP)
      .forEach(() => render(movieListContainer, createMovieCardTemplate(moviesInfo), 'beforeend'));

    renderedCardsCount += CARDS_NUMBER_PER_STEP;

    if (renderedCardsCount >= moviesInfo.length) {
      showMoreButton.remove();
    }
  });
}


/**
if (moviesInfo.length > CARDS_NUMBER_PER_STEP) {
  render(movieListContainer, createShowMoreButton(), 'beforeend');

  const showMoreButton = movieListContainer.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    alert('Works!');
  });
}
*/

//Рендерит попап с информацией о фильме
const moviePopupList = new Array(1).fill().map(() => generateMovieCard());
const commentsList = new Array(10).fill().map(() => generateComment());
render(siteFooterElement, createMovieInfoPopup(moviePopupList[0], commentsList[0]), 'afterend');
