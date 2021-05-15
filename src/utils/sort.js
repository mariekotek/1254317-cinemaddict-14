export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const sortFilmsRate = (filmA, filmB) => {
  const valueA = filmA.rate;
  const valueB = filmB.rate;

  return valueB - valueA;
};

export const sortFilmsDate = (filmA, filmB) => {
  return filmB.year - filmA.year;
};
