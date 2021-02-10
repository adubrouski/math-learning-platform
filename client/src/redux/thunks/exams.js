import { getAllExams, getExamById, postExamResult } from '../../api/index';
import { setCurrentExam, setExams, clearCurrentExam } from '../actions/exams';

const fetchAllExams = () => async (dispatch) => {
  try {
    const { data } = await getAllExams();

    dispatch(setExams(data));
  } catch ({ response }) {
    console.log(response);
  }
};

const fetchExamById = (id) => async (dispatch) => {
  try {
    const { data } = await getExamById(id);

    dispatch(setCurrentExam(data));
  } catch ({ response }) {
    console.log(response);
  }
};

const sendExamResult = (obj) => async (dispatch) => {
  try {
    const { data } = await postExamResult(obj);
    console.log(data);
    dispatch(clearCurrentExam());
  } catch ({ response }) {
    console.log(response);
  }
};

export { fetchAllExams, fetchExamById, sendExamResult };
