import http from '../services/httpService';

const postLogin = (candidate) => http.post('/auth/login', candidate);
const postRegister = (candidate) => http.post('/auth/register', candidate);
const deleteCookies = () => http.delete('/auth/logout');
const getUser = () =>
  http.get('/auth', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

const getAllTopics = () => http.get('/topics');
const getTopicsForClassrooms = () => http.get('/classrooms');
const getGradeTopics = (grade) => http.get(`/classrooms/classroom?grade=${grade}`);
const getTopic = (id) => http.get(`/topics/topic?id=${id}`);

const getAllExams = () => http.get(`/exams`);
const getExamById = (id) => http.get(`/exams/exam?id=${id}`);
const postExamResult = (obj) => http.post(`/exams`, obj);

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
