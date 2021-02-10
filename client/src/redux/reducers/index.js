import { combineReducers } from 'redux';

import user from './user';
import topics from './topics';
import classrooms from './classrooms';
import exams from './exams';

const rootReducer = combineReducers({
  user,
  topics,
  classrooms,
  exams,
});

export default rootReducer;
