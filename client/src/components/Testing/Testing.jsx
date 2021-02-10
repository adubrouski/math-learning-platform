import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Testing = ({ questions, currentQuestion, increaseCounter, addRightAnswer }) => {
  const history = useHistory();
  const [activeItem, setActiveItem] = React.useState(null);

  const question = questions && questions[currentQuestion - 1].question;
  const answers = questions && questions[currentQuestion - 1].answers;

  const buttonClickHandler = () => {
    increaseCounter();
    if (activeItem + 1 === questions[currentQuestion - 1].rightAnswer) {
      addRightAnswer();
      toast.success('RIGHT');
    } else {
      toast.error('WRONG');
    }
    setActiveItem(null);
    history.push('/home');
  };

  const finishExamHandler = () => {
    increaseCounter();
    if (activeItem + 1 === questions[currentQuestion - 1].rightAnswer) {
      addRightAnswer();
      toast.success('RIGHT');
    } else {
      toast.error('WRONG');
    }
    setActiveItem(null);
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
              <button
                className="testing__button"
                onClick={buttonClickHandler}
                disabled={!activeItem && activeItem !== 0}>
                Завершить тест
              </button>
            ) : (
              <button
                className="testing__button"
                onClick={finishExamHandler}
                disabled={!activeItem && activeItem !== 0}>
                Следующий вопрос
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Testing;
