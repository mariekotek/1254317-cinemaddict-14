import dayjs from 'dayjs';

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const sortFilmsRank = (filmA, filmB) => {
  const valueA = filmA.rank;
  const valueB = filmB.rank;

  return valueB - valueA;
};

export const sortFilmsDate = (filmA, filmB) => {
  return dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));
};
