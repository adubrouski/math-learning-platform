import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchExamById } from '../redux/thunks/exams';
import { increase, increaseRightAnswer } from '../redux/actions/exams';
import { Testing } from '../components';

const Exam = ({ id }) => {
  const dispatch = useDispatch();
  const exam = useSelector(({ exams }) => exams.currentExam);

  const increaseCounter = () => dispatch(increase());
  const addRightAnswer = () => dispatch(increaseRightAnswer());

  React.useEffect(() => {
    dispatch(fetchExamById(id));
  }, []);

  return (
    <div>
      <Testing {...exam} increaseCounter={increaseCounter} addRightAnswer={addRightAnswer} />
    </div>
  );
};

export default Exam;
