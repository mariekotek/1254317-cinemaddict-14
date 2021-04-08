import {getRandomInteger} from './utils.js';
import {generateRandom} from './utils.js';
import {getRandomNumber} from './utils.js';


export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};

console.log(movie);
