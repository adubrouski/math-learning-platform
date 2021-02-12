import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TopicsBoard, Loader } from '../../components';

import { fetchClassroomsTopics } from '../../redux/thunks/classroom';

const Classroom = () => {
  const dispatch = useDispatch();
  const { topics, filter } = useSelector(({ topics }) => topics);

  React.useEffect(() => {
    if (filter === 'classrooms') {
      return;
    } else {
      dispatch(fetchClassroomsTopics());
    }
  }, []);

  return (
    <div className="classrooms">
      <h3 className="classrooms__title">Учебные классы</h3>
      <div className="topics-board__wrapper">
        {filter === 'classrooms' ? (
          <>
            <TopicsBoard title={'2 класс'} topics={topics.secGrade} />
            <TopicsBoard title={'3 класс'} topics={topics.thirdGrade} />
            <TopicsBoard title={'4 класс'} topics={topics.fourthGrade} />
            <TopicsBoard title={'5 класс'} topics={topics.fifthGrade} />
            <TopicsBoard title={'6 класс'} topics={topics.sixthGrade} />
            <TopicsBoard title={'7 класс'} topics={topics.seventhGrade} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Classroom;
