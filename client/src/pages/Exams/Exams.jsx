import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Testing } from '../../components';

import { fetchAllExams } from '../../redux/thunks/exams';

const Tests = () => {
  const dispatch = useDispatch();
  const { exams } = useSelector(({ exams }) => exams);

  React.useEffect(() => {
    dispatch(fetchAllExams());
  }, []);

  return (
    <div className="exams">
      <h3 className="exams__title">Пройдите тест</h3>
      <div className="exams__content">
        <ul className="exams__list">
          {exams &&
            Object.values(exams).map(({ exam }) => (
              <li key={exam._id} className="exams__list-item">
                {exam.question}
              </li>
            ))}
        </ul>
        {/* <Testing /> */}
      </div>
    </div>
  );
};

export default Tests;
