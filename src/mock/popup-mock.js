import {getRandomInteger} from './utils.js';
import {generateRandom} from './utils.js';
import {getRandomNumber} from './utils.js';


// Данные-информация о фильмах

const posters = [
  'images/posters/the-dance-of-life.jpg',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/popeye-meets-sinbad.png'
];
const ages = [
  '18+'
];
const names = [
  'The Man with the Golden Arm',
  'The Great Flamarion',
  'Santa Claus Conquers the Martians',
  'Made for Each Other',
  'Popeye the Sailor Meets Sindbad the Sailor'
];
const originalNames = [
  'Original: The Great Flamarion', 'Original: -'

];
const rates = [
  '9.0', '8.9', '2.3', '5.8', '3,2'
];
const directors = [
  'Anthony Mann'
];
const writersList = [
  'Anne Wigton', 'Heinz Herald', 'Richard Weil'
];
const actotsList = [
  'Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'
];
const releaseDates = [
  '30 March 1945'
];
const runtimes = [
  '16m', '1h 32m', '1h 59m', '1h 18m', '1h 21m'
];
const countries = [
  'USA', 'France'
];
const genres = [
  'Comedy', 'Mystery', 'Drama', 'Cartoon', 'Film-Noir'
];
const descriptions = [
  'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…',
  'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…',
  'The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…',
  'John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…',
  'In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…'
];



export const generatePopup = () => {
  return {
    poster: generateRandom(posters),
    age: generateRandom(ages),
    name: generateRandom(names),
    originalName: generateRandom(originalNames),
    rate: generateRandom(rates),
    director: generateRandom(directors),
    writers: generateRandom(writersList),
    actors: generateRandom(actotsList),
    releaseDate: generateRandom(releaseDates),
    runtime: generateRandom(runtimes),
    country: generateRandom(countries),
    genre: generateRandom(genres),
    description: generateRandom(descriptions),
    isInWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavourite: Boolean(getRandomInteger(0, 1)),
  };
};
