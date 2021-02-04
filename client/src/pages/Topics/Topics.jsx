import React from 'react';

import TopicsBoard from '../../components/TopicsBoard/TopicsBoard';

const Topics = () => {
  return (
    <div className="topics">
      <h3 className="topics__title">Теоретический материал</h3>
      <div className="topics-board__wrapper">
        <TopicsBoard title={'Алгебра'} />
        <TopicsBoard title={'Геометрия'} />
      </div>
    </div>
  );
};

export default Topics;
