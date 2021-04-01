import {createMainMenuTemplate} from './view/main-menu.js';
import {createMovieList} from './view/movie-card.js';
import {createMovieCardTemplate} from './view/movie-card.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createShowMoreButton} from './view/show-more-btn.js';
import{createMovieInfoPopup} from './view/info-popup.js';

const CARDS_NUMBER = 5;
const TOP_RATED = 2;
const MOST_COMMENTED = 2;

// Вставляет HTML-код в указанное место
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
// Рендерит сортировку и фильтры
render(siteMainElement, createMainMenuTemplate(), 'afterbegin');

const siteHeaderElement = document.querySelector('.header');
//Рендерит аватар и звание пользователя
render(siteHeaderElement, createUserRankTemplate(), 'beforeend');

//Рендерит контейнер для списка фильмов
render(siteMainElement, createMovieList(), 'beforeend');

const filmsSection = siteMainElement.querySelector('.films');
const movieListContainer = filmsSection.querySelector('.films-list__container');
const mostCommentedSection = filmsSection.lastElementChild;
const mostCommentedSectionContainer = mostCommentedSection.querySelector('.films-list__container');
const topRatedSection = filmsSection.querySelector('.films-list--extra');
const topRatedSectionContainer = topRatedSection.querySelector('.films-list__container');

//Рендерит карточки фильмов i количество раз
for (let i = 0; i < CARDS_NUMBER; i++) {
  render(movieListContainer, createMovieCardTemplate(), 'beforeend');
}
for (let i = 0; i < MOST_COMMENTED; i++) {
  render(mostCommentedSectionContainer, createMovieCardTemplate(), 'beforeend');
}
for (let i = 0; i < TOP_RATED; i++) {
  render(topRatedSectionContainer, createMovieCardTemplate(), 'beforeend');
}

//Рендерит кнопку 'Показать еще'
render(movieListContainer, createShowMoreButton(), 'afterend');

const siteFooterElement = document.querySelector('.footer');

//Рендерит попан с информацией о фильме
//render(siteFooterElement, createMovieInfoPopup(), 'afterend');
