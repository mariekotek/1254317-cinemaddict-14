import {createElement} from '../utils.js';

const createMovieBoardTemplate = () => {
  return `<section class="films"> <section class="films-list">
                    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
                    <div class="films-list__container">
                    </div>
               </section>
               <section class="films-list films-list--extra films-list__top-rated">
                    <h2 class="films-list__title">Top rated</h2>
                    <div class="films-list__container">
                    </div>
               </section>
               <section class="films-list films-list--extra films-list__most-commented">
                    <h2 class="films-list__title">Most commented</h2>
                    <div class="films-list__container">
                    </div>
               </section>
          </section>`;
};

export default class MovieBoard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMovieBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
