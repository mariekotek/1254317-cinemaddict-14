import AbstractView from './abstract.js';
import {SortType} from '../utils/sort.js';

const createMainSortTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;
};

export default class MainSort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createMainSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    const currentBtn = evt.target;
    const btnActive = 'sort__button--active';
    const allButtons = this.getElement().querySelectorAll('a');

    if (currentBtn.tagName !== 'A') {
      return;
    }

    if (!currentBtn.classList.contains(btnActive)) {
      allButtons.forEach((button) => {
        button.classList.remove(btnActive);
      });

      currentBtn.classList.add(btnActive);
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
