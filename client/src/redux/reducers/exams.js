const initState = {
  isLoaded: false,
  exams: {},
};

const exams = (state = initState, action) => {
  switch (action.type) {
    case 'SET_EXAMS':
      return {
        ...state,
        exams: action.exams,
      };
    default:
      return state;
  }
};

export default exams;
