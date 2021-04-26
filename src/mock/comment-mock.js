import {generateRandom} from '../utils/get_random.js';

//данные для комментариев

const emotions = [
  'images/emoji/smile.png',
  'images/emoji/sleeping.png',
  'images/emoji/puke.png',
  'images/emoji/angry.png',
];

const dates = [
  '2019/12/31 23:59',
  '2 days ago',
  'Today',
];

const authors = [
  'John Doe',
  'Tim Macoveev',
];

const messages = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];

//генерирует комментарий

export const generateComment = () => {
  return {
    emotion: generateRandom(emotions),
    date: generateRandom(dates),
    author: generateRandom(authors),
    message: generateRandom(messages),
  };
};

const comments = [];
for (let i = 0; i < 4; i++) {
  comments.push(generateComment());
}

export {comments};
