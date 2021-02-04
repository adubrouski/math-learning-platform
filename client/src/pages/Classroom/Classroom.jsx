import React from 'react';

import TopicsBoard from '../../components/TopicsBoard/TopicsBoard';

const Classroom = () => {
  return (
    <div className="classrooms">
      <h3 className="classrooms__title">Учебные классы</h3>
      <div className="topics-board__wrapper">
        <TopicsBoard title={'2 класс'} />
        <TopicsBoard title={'3 класс'} />
        <TopicsBoard title={'4 класс'} />
        <TopicsBoard title={'5 класс'} />
        <TopicsBoard title={'6 класс'} />
        <TopicsBoard title={'7 класс'} />
      </div>
    </div>
  );
};

export default Classroom;
