import { getAllExams, getExamById, postExamResult } from '../../api/index';
import { setCurrentExam, setExams, clearCurrentExam } from '../actions/exams';

import { toast } from 'react-toastify';

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

const sendExamResult = (obj, userId) => async (dispatch) => {
  try {
    const { data } = await postExamResult({ ...obj, userId });
    toast.success(data.message);
    dispatch(clearCurrentExam());
  } catch ({ response }) {
    console.log(response);
  }
};

export { fetchAllExams, fetchExamById, sendExamResult };
