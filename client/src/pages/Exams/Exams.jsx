import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { fetchAllExams } from '../../redux/thunks/exams';

import Exam from '../../containers/Exam';
import { loader } from '../../assets/img';

const Tests = ({ match }) => {
  const dispatch = useDispatch();
  const { exams, isLoaded } = useSelector(({ exams }) => exams);

  React.useEffect(() => {
    dispatch(fetchAllExams());
  }, []);

  return (
    <div className="exams">
      <h3 className="exams__title">Пройдите тест</h3>
      <div className="exams__content">
        {!match.params.id ? (
          <ul className="exams__list">
            {exams && isLoaded ? (
              Object.values(exams).map((exam) => (
                <li
                  onClick={null}
                  key={exam.id}
                  className={classNames('exams__list-item', {
                    exams__tick: exam.isPassed.length !== 0 && exam.isPassed[0].isPassed,
                    exams__question: exam.isPassed.length === 0,
                    exams__cross: exam.isPassed.length !== 0 && exam.isPassed[0].isPassed === false,
                  })}>
                  <Link to={`exams/exam/${exam.id}`}>{exam.topic}</Link>
                </li>
              ))
            ) : (
              <img src={loader} alt="" />
            )}
          </ul>
        ) : (
          <Exam id={match.params.id} />
        )}
      </div>
    </div>
  );
};

export default Tests;
