import produce from 'immer';

const initState = {
  isLoaded: false,
  exams: {},
  currentExam: {},
};

const exams = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_EXAMS':
        draft.exams = action.exams;
        draft.isLoaded = true;
        break;
      case 'SET_CURRENT_EXAM':
        draft.currentExam = { ...action.exam, currentQuestion: 1, rightAnswers: 0 };
        draft.isLoaded = true;
        break;
      case 'INCREASE':
        draft.currentExam.currentQuestion += 1;
        break;
      case 'INCREASE_RIGHT_ANSWER':
        draft.currentExam.rightAnswers += 1;
        break;
      case 'CLEAR_CURRENT_EXAM':
        draft.isLoaded = false;
        draft.exams = {};
        draft.currentExam = {};
        break;
      default:
    }
  });
};

export default exams;
