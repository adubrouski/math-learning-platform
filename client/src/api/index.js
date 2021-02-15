import http from '../services/httpService';

const createAuthHeader = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
};

const postLogin = (candidate) => http.post('/auth/login', candidate);
const postRegister = (candidate) => http.post('/auth/register', candidate);
const deleteCookies = () => http.delete('/auth/logout');
const getUser = () => http.get('/auth', createAuthHeader());

const getAllTopics = () => http.get('/topics', createAuthHeader());
const getTopicsForClassrooms = () => http.get('/classrooms', createAuthHeader());
const getGradeTopics = (grade) =>
  http.get(`/classrooms/classroom?grade=${grade}`, createAuthHeader());
const getTopic = (id) => http.get(`/topics/topic?id=${id}`, createAuthHeader());

const getAllExams = () =>
  http.get(`/exams`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      UserId: localStorage.getItem('userId'),
    },
  });
const getExamById = (id) => http.get(`/exams/exam?id=${id}`, createAuthHeader());
const postExamResult = (obj) => http.post(`/exams`, obj, createAuthHeader());

export {
  postLogin,
  postRegister,
  getUser,
  deleteCookies,
  getAllTopics,
  getTopicsForClassrooms,
  getGradeTopics,
  getTopic,
  getAllExams,
  getExamById,
  postExamResult,
};
