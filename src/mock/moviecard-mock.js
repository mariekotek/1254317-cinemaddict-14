import {getRandomInteger} from './utils.js';
import {generateRandom} from './utils.js';
import {getRandomNumber} from './utils.js';

//данные для карточек фильмов

const movies = [
    'The Man with the Golden Arm',
    'The Great Flamarion',
    'Santa Claus Conquers the Martians',
    'Made for Each Other',
    'Popeye the Sailor Meets Sindbad the Sailor'
];
const posters = [
  'images/posters/the-dance-of-life.jpg',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/popeye-meets-sinbad.png'
];
const rates = [
  '9.0', '8.9', '2.3', '5.8', '3,2'
];
const years = [
  '1929', '1933', '1955', '1964', '1936'
];
const durations = [
  '16m', '1h 32m', '1h 59m', '1h 18m', '1h 21m'
];
const genres = [
  'Comedy', 'Mystery', 'Drama', 'Cartoon'
];
const descriptions = [
  'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…',
  'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…',
  'The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…',
  'John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…',
  'In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…'
];

//генерирует объект-карточку фильма

export const generateMovieCard = () => {
  return {
    poster: generateRandom(posters),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavourite: Boolean(getRandomInteger(0, 1)),
    name: generateRandom(movies),
    rate: generateRandom(rates),
    year: generateRandom(years),
    duration: generateRandom(durations),
    genre: generateRandom(genres),
    description: generateRandom(descriptions),
    comments: getRandomNumber(0, 5),
  };
};

