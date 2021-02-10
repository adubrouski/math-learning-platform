import { getAllExams } from '../../api/index';
import { setExams } from '../actions/exams';

const fetchAllExams = () => async (dispatch) => {
  try {
    const { data } = await getAllExams();

    dispatch(setExams(data));
  } catch ({ response }) {
    console.log(response);
  }
};

export { fetchAllExams };
