import React from 'react';
import parse from 'html-react-parser';

import { fetchTopicById } from '../../redux/thunks/topics';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components';

const Topic = ({ match }) => {
  const dispatch = useDispatch();
  const { currentTopic } = useSelector(({ topics }) => topics);

  const parsed = parse(currentTopic !== null ? currentTopic.markup : '');

  React.useEffect(() => {
    dispatch(fetchTopicById(match.params.id));
  }, []);

  return (
    <div className="topic">
      {currentTopic !== null && currentTopic.id === match.params.id ? (
        <>
          <h3 className="topic__title">{currentTopic.name}</h3>
          <div className="topic__content">{parsed}</div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Topic;
