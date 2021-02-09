import { getTopicsForClassrooms, getGradeTopics } from '../../api/index';
import { setTopics } from '../actions/topics';
import { setGradeTopics } from '../actions/classrooms';

const fetchClassroomsTopics = () => async (dispatch) => {
  try {
    const { data } = await getTopicsForClassrooms();

    dispatch(setTopics({ data, filter: 'classrooms' }));
  } catch ({ response }) {
    console.log(response);
  }
};

const fetchTopicsForGrade = (grade) => async (dispatch) => {
  try {
    const { data } = await getGradeTopics(grade);

    dispatch(setGradeTopics(data));
  } catch ({ response }) {
    console.log(response);
  }
};

export { fetchClassroomsTopics, fetchTopicsForGrade };
