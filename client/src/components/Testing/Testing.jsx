import React from 'react';

const Testing = () => {
  const [activeItem, setActiveItem] = React.useState(null);
  const [currentQuestion, setCurrentQuestion] = React.useState(1);

  const questions = [
    { title: 'Question 1', answers: ['Q1_1', 'Q1_2', 'Q1_3', 'Q1_4'] },
    { title: 'Question 2', answers: ['Q2_1', 'Q2_2', 'Q2_3', 'Q2_4'] },
    { title: 'Question 3', answers: ['Q3_1', 'Q3_2', 'Q3_3', 'Q3_4'] },
    { title: 'Question 4', answers: ['Q4_1', 'Q4_2', 'Q4_3', 'Q4_4'] },
    { title: 'Question 5', answers: ['Q5_1', 'Q5_2', 'Q5_3', 'Q5_4'] },
    { title: 'Question 6', answers: ['Q6_1', 'Q6_2', 'Q6_3', 'Q6_4'] },
  ];

  return (
    <div className="testing">
      <div className="testing-top">
        <h6 className="testing__title">{questions[currentQuestion - 1].title}</h6>
        <p>
          {currentQuestion}/{questions.length}
        </p>
      </div>

      <ol className="testing__answers">
        {questions[currentQuestion - 1].answers.map((item, index) => (
          <li
            className={
              index === activeItem ? 'testing__answers-option active' : 'testing__answers-option'
            }
            key={`${index}_${item}`}
            onClick={() => setActiveItem(index)}>
            {item}
          </li>
        ))}
      </ol>
      <div className="testing__wrapper">
        <button
          className="testing__button"
          onClick={() => {
            if (currentQuestion === questions.length) {
              setCurrentQuestion(1);
            } else {
              setCurrentQuestion(currentQuestion + 1);
            }
            setActiveItem(null);
          }}
          disabled={activeItem === null}>
          {currentQuestion === questions.length ? 'Завершить тест' : 'Следующий вопрос'}
        </button>
      </div>
    </div>
  );
};

export default Testing;
