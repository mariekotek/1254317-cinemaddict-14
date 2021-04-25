import MainMenuView from './view/main-menu.js';
import MainSortView from './view/main-sort.js';
import MovieBoardView from './view/movie-board.js';
import FilmCardView from './view/movie-card.js';
import UserRankView from './view/user-rank.js';
import ShowMoreButtonView from './view/show-more-btn.js';
import FilmPopupView from './view/info-popup.js';
import {generateFilmCard} from './mock/moviecard-mock.js';
//import {generateComment, comments} from './mock/comment-mock.js';
//import {generateFilters} from './mock/main-menu-mock.js';
import {render, RenderPosition} from './utils.js';

const CARDS_NUMBER = 5;
const CARDS_NUMBER_PER_STEP = 4;
const TOP_RATED = 2;
const MOST_COMMENTED = 2;
//const COMMENTS_NUMBER = 4;

//Массив объектов
const films = new Array(15).fill().map(() => generateFilmCard());
//const filters = generateFilters(films);

const siteMainElement = document.querySelector('.main');
// Рендерит сортировку и фильтры
render(siteMainElement, new MainMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainSortView().getElement(), RenderPosition.BEFOREEND);

const siteHeaderElement = document.querySelector('.header');
//Рендерит аватар и звание пользователя
render(siteHeaderElement, new UserRankView().getElement(), RenderPosition.BEFOREEND);

//Рендерит контейнер для списка фильмов
const movieBoardComponent = new MovieBoardView;
render(siteMainElement, movieBoardComponent.getElement(), RenderPosition.BEFOREEND);

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

  films.forEach((item, index) => {
    const filmComponent = new FilmCardView(item);
    const popupComponent = new FilmPopupView(item);

    const openPopup = () => {
      document.querySelector('body').classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
      render(siteFooterElement, popupComponent.getElement(), RenderPosition.BEFOREEND);
    };

    const closePopup = () => {
      document.querySelector('body').classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
      siteFooterElement.removeChild(popupComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt && (evt.key === 'Escape' || evt.key === 'Esc')) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const setClosePopup = (selector) => {
      popupComponent.getElement().querySelector(selector).addEventListener('click', () => closePopup());
    };

    const setOpenPopup = (selector) => {
      filmComponent.getElement().querySelector(selector).addEventListener('click', () => openPopup());
    };
    setOpenPopup('.film-card__poster');
    setOpenPopup('.film-card__title');
    setOpenPopup('.film-card__comments');
    setClosePopup('.film-details__close-btn');
    onEscKeyDown();
    index < n && render(place, filmComponent.getElement(), RenderPosition.BEFOREEND);
  });
};

renderCard(CARDS_NUMBER, movieListContainer);
renderCard(MOST_COMMENTED, mostCommentedSectionContainer);
renderCard(TOP_RATED, topRatedSectionContainer);
// const renderCard = (n, place) => {
//   films.forEach((item, index) => {
//     const filmComponent = new FilmCardView(item);
//     filmComponent.setClickPoster();
//     filmComponent.setClickTitle();
//     filmComponent.setClickComments();
//     //popupComponent.setClosePopupEsc();
//     index < n && render(place, filmComponent.getElement(), RenderPosition.BEFOREEND);
//   });
// const renderComment = (n) => {
//   comments.forEach((item, index) => {
//     const commentsList = new FilmPopupView().getElement().querySelector('.film-details__comments-list');
//     return index < n && render(commentsList, new CommentView(item).getElement(), RenderPosition.BEFOREEND);
//   });
//   };
// const popupComponent = new FilmPopupView(item);


renderCard(CARDS_NUMBER, movieListContainer);
renderCard(MOST_COMMENTED, mostCommentedSectionContainer);
renderCard(TOP_RATED, topRatedSectionContainer);

// const one = new FilmPopupView(films[0]).getElement();
// console.log(one.querySelector('.film-details__close-btn'));

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
  render(movieListContainer, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = movieListContainer.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    alert('Works!');
  });
}

/**
 const popupElement = document.querySelector('.film-details');
const commentsList = popupElement.querySelector('.film-details__comments-list');

const renderComment = (n) => {
  comments.forEach((item, index) => {
    return index < n && render(commentsList, new CommentView(item).getElement(), RenderPosition.BEFOREEND);
  });
};
renderComment(COMMENTS_NUMBER);
 */
