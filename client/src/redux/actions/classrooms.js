const setGradeTopics = (data) => ({
  type: 'SET_GRADE_TOPICS',
  data,
});

const setGrade = (grade) => ({
  type: 'SET_GRADE',
  grade,
});

export { setGradeTopics, setGrade };
