import {generateFilmCard} from './mock/moviecard-mock.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilmsModel from './model/movies.js';

// const CARDS_NUMBER = 5;
// const TOP_RATED = 2;
// const MOST_COMMENTED = 2;
//const COMMENTS_NUMBER = 4;

//Массив объектов
const films = new Array(15).fill().map(() => generateFilmCard());
//const filters = generateFilters(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);
// const siteFooterElement = document.querySelector('.footer');

// // Рендерит сортировку и фильтры
// render(siteMainElement, new MainMenuView().getElement(), RenderPosition.BEFOREEND);
// render(siteMainElement, new MainSortView().getElement(), RenderPosition.BEFOREEND);
//
// //Рендерит аватар и звание пользователя
// render(siteHeaderElement, new UserRankView().getElement(), RenderPosition.BEFOREEND);
//
// //Рендерит контейнер для списка фильмов
// const movieBoardComponent = new MovieBoardView;
// render(siteMainElement, movieBoardComponent.getElement(), RenderPosition.BEFOREEND);
//
//Секции/контейнеры
//const filmsSection = siteMainElement.querySelector('.films');
//const movieListContainer = filmsSection.querySelector('.films-list__container');
// const mostCommentedSection = filmsSection.querySelector('.films-list__most-commented');
// const mostCommentedSectionContainer = mostCommentedSection.querySelector('.films-list__container');
// const topRatedSection = filmsSection.querySelector('.films-list__top-rated');
// const topRatedSectionContainer = topRatedSection.querySelector('.films-list__container');


// //Рендерит карточки фильмов i количество раз
// const renderCard = (n, place) => {
//   if (films.length === 0) {
//     render(place, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
//   } else {
//     films.forEach((item, index) => {
//       const filmComponent = new FilmCardView(item);
//       const popupComponent = new FilmPopupView(item);
//
//       const openPopup = () => {
//         document.querySelector('body').classList.add('hide-overflow');
//         document.addEventListener('keydown', onEscKeyDown);
//         render(siteFooterElement, popupComponent.getElement(), RenderPosition.BEFOREEND);
//       };
//
//       const closePopup = () => {
//         document.querySelector('body').classList.remove('hide-overflow');
//         document.removeEventListener('keydown', onEscKeyDown);
//         siteFooterElement.removeChild(popupComponent.getElement());
//       };
//
//       const onEscKeyDown = (evt) => {
//         if (evt && (evt.key === 'Escape' || evt.key === 'Esc')) {
//           evt.preventDefault();
//           closePopup();
//           document.removeEventListener('keydown', onEscKeyDown);
//         }
//       };
//
//       const setClosePopup = () => {
//         popupComponent.setEditClickHandler(() => {
//           closePopup();
//         });
//       };
//
//       const setOpenPopup = () => {
//         filmComponent.setEditClickHandler(() => {
//           openPopup();
//         });
//       };
//       setOpenPopup();
//       setClosePopup();
//       onEscKeyDown();
//       index < n && render(place, filmComponent.getElement(), RenderPosition.BEFOREEND);
//
//     });
//   }
// };
//
// renderCard(CARDS_NUMBER, movieListContainer);
// renderCard(MOST_COMMENTED, mostCommentedSectionContainer);
// renderCard(TOP_RATED, topRatedSectionContainer);
//
// //Кнопка SHOW MORE
//
// // if (films.length > CARDS_NUMBER_PER_STEP) {
// //   const showMoreButton = new ShowMoreButtonView();
// //   render(movieListContainer, showMoreButton.getElement(), RenderPosition.BEFOREEND);
// //
// //   showMoreButton.setClickHandler(() => {
// //     alert('Works!');
// //   });
// // }
//
// if (films.length > CARDS_NUMBER_PER_STEP) {
//   let renderedFilmCount = CARDS_NUMBER_PER_STEP;
//   const showMoreButton = new ShowMoreButtonView();
//   render(movieListContainer, showMoreButton.getElement(), RenderPosition.BEFOREEND);
//   showMoreButton.setClickHandler(() => {
//     films
//       .slice(renderedFilmCount, renderedFilmCount + CARDS_NUMBER_PER_STEP)
//       .forEach(() => renderCard(CARD, movieListContainer));
//     renderedFilmCount += CARDS_NUMBER_PER_STEP;
//     if (renderedFilmCount >= films.length) {
//       showMoreButton.removeElement();
//     }
//   });
// }

const movieListPresenter = new MovieListPresenter(siteMainElement, siteHeaderElement, filmsModel);
movieListPresenter.init(films);
