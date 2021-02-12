import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { Button, Loader } from '../../components';

const Testing = ({ questions, currentQuestion, increaseCounter, addRightAnswer, sendResult }) => {
  const history = useHistory();
  const [activeItem, setActiveItem] = React.useState(null);

  const question = questions && questions[currentQuestion - 1].question;
  const answers = questions && questions[currentQuestion - 1].answers;

  const buttonClickHandler = () => {
    increaseCounter();

    if (activeItem + 1 === questions[currentQuestion - 1].rightAnswer) {
      addRightAnswer();
      toast.success('Правильный ответ');
    } else {
      toast.error('Ответ неверный');
    }
    setActiveItem(null);
  };

  const finishExamHandler = () => {
    buttonClickHandler();
    sendResult(true);

    history.push('/home');
  };

  return (
    <>
      {questions ? (
        <div className="testing">
          <div className="testing-top">
            <h6 className="testing__title">{question}</h6>
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
          <div className="testing__wrapper">
            {currentQuestion === questions.length ? (
              <Button exam onClick={finishExamHandler} disabled={!activeItem && activeItem !== 0}>
                Завершить тест
              </Button>
            ) : (
              <Button exam onClick={buttonClickHandler} disabled={!activeItem && activeItem !== 0}>
                Следующий вопрос
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Testing;
