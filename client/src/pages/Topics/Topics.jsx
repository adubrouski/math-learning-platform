import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TopicsBoard, Loader } from '../../components';

import { fetchTopics } from '../../redux/thunks/topics';

const Topics = () => {
  const dispatch = useDispatch();
  const { topics, filter } = useSelector(({ topics }) => topics);

  React.useEffect(() => {
    if (filter === 'topics') {
      return;
    } else {
      dispatch(fetchTopics());
    }
  }, []);

  return (
    <div className="topics">
      <h3 className="topics__title">Теоретический материал</h3>
      <div className="topics-board__wrapper">
        {filter === 'topics' ? (
          <>
            <TopicsBoard title={'Алгебра'} topics={topics.algebra} />
            <TopicsBoard title={'Геометрия'} topics={topics.geometry} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Topics;
