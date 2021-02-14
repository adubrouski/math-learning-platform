import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchExamById, sendExamResult } from '../redux/thunks/exams';
import { increase, increaseRightAnswer } from '../redux/actions/exams';
import { Testing } from '../components';

const Exam = ({ match }) => {
  const dispatch = useDispatch();
  const { exams, user } = useSelector(({ exams, user }) => ({
    exams,
    user,
  }));

  const increaseCounter = () => dispatch(increase());
  const addRightAnswer = (rightAnswers) => {
    dispatch(increaseRightAnswer());
    return ++rightAnswers;
  };

  const sendResult = (isPassed) =>
    dispatch(sendExamResult({ examId: exams.currentExam.id, isPassed }, user.userInfo.userId));

  React.useEffect(() => {
    dispatch(fetchExamById(match.params.id));
  }, []);

  return (
    <Testing
      {...exams.currentExam}
      increaseCounter={increaseCounter}
      addRightAnswer={addRightAnswer}
      sendResult={sendResult}
    />
  );
};

export default Exam;
