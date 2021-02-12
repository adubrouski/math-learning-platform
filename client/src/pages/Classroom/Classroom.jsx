import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTopicsForGrade } from '../../redux/thunks/classroom';

import { TopicsBoard, Loader } from '../../components';

const Classroom = () => {
  const dispatch = useDispatch();
  const { currentGrade, isLoaded, currentTopics } = useSelector(({ classrooms }) => classrooms);

  React.useEffect(() => {
    dispatch(fetchTopicsForGrade(currentGrade));
  }, [currentGrade]);

  return (
    <div className="classrooms">
      <h3 className="classrooms__title">{currentGrade} класс</h3>
      <div className="topics-board__wrapper">
        {isLoaded ? <TopicsBoard topics={Object.values(currentTopics)} /> : <Loader />}
      </div>
    </div>
  );
};

export default Classroom;
