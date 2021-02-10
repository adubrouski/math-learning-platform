const setExams = (exams) => ({
  type: 'SET_EXAMS',
  exams,
});

const setCurrentExam = (exam) => ({
  type: 'SET_CURRENT_EXAM',
  exam,
});

const increase = () => ({
  type: 'INCREASE',
});

const increaseRightAnswer = () => ({
  type: 'INCREASE_RIGHT_ANSWER',
});

const clearCurrentExam = () => ({
  type: 'CLEAR_CURRENT_EXAM',
});

export { setExams, setCurrentExam, increase, increaseRightAnswer, clearCurrentExam };
