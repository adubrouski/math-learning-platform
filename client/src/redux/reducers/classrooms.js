const initState = {
  isLoaded: false,
  currentGrade: null,
  currentTopics: {},
};

const classrooms = (state = initState, action) => {
  switch (action.type) {
    case 'SET_GRADE':
      return {
        ...state,
        currentGrade: action.grade,
      };
    case 'SET_GRADE_TOPICS':
      return {
        ...state,
        currentTopics: action.data,
        isLoaded: true,
      };
    default:
      return state;
  }
};

export default classrooms;
