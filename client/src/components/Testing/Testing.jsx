import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';

import './Testing.sass';

import { Button, Loader } from '../../components';

const Testing = ({
  questions,
  topic,
  currentQuestion,
  increaseCounter,
  addRightAnswer,
  sendResult,
  rightAnswers,
}) => {
  const history = useHistory();
  const [activeItem, setActiveItem] = React.useState(null);

  const question = questions && questions[currentQuestion - 1].question;
  const answers = questions && questions[currentQuestion - 1].answers;

  const buttonClickHandler = () => {
    increaseCounter();

    if (activeItem + 1 === questions[currentQuestion - 1].rightAnswer) {
      toast.success('Правильный ответ');
      setActiveItem(null);

      return addRightAnswer(rightAnswers);
    } else {
      toast.error('Ответ неверный');
      setActiveItem(null);

      return rightAnswers;
    }
  };

  const finishExamHandler = () => {
    const rightCounter = buttonClickHandler();

    sendResult(rightCounter / questions.length > 0.5 ? true : false);

    history.push('/exams');
  };

  return (
    <>
      {questions ? (
        <div className="testing__wrapper">
          <h3 className="testing__topic">{topic}</h3>
          <div className="testing">
            <div className="testing-top">
              <h6 className="testing__title">{parse(question)}</h6>
              <p>
                {currentQuestion}/{questions.length}
              </p>
            </div>
            <ol className="testing__answers">
              {answers.map((item, index) => (
                <li
                  className={
                    activeItem === index
                      ? 'testing__answers-option active'
                      : 'testing__answers-option'
                  }
                  key={`${index}_${item}`}
                  onClick={() => setActiveItem(index)}>
                  {item}
                </li>
              ))}
            </ol>
            <div className="testing__bottom">
              {currentQuestion === questions.length ? (
                <Button exam onClick={finishExamHandler} disabled={!activeItem && activeItem !== 0}>
                  Завершить тест
                </Button>
              ) : (
                <Button
                  exam
                  onClick={buttonClickHandler}
                  disabled={!activeItem && activeItem !== 0}>
                  Следующий вопрос
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Testing;
