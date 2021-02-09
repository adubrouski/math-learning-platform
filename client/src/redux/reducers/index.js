import { combineReducers } from 'redux';

import user from './user';
import topics from './topics';
import classrooms from './classrooms';

const rootReducer = combineReducers({
  user,
  topics,
  classrooms,
});

export default rootReducer;
