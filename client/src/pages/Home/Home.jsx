import React from 'react';
import { useHistory } from 'react-router-dom';

import './Home.sass';

import { Auth, Banner, Task } from '../../components';

const Home = () => {
  const history = useHistory();
  return (
    <div className="home">
      {history.location.pathname === '/login' || history.location.pathname === '/register' ? (
        <Auth />
      ) : null}
      <div className="home__content">
        <Banner title="Решай" img="https://i.imgur.com/spZCrEw.png" />
        <div className="content-items">
          <Task title="Какого знака не хватает?" img="https://i.imgur.com/YaeRWul.jpg">
            <p className="backside__task">4 _ 3 = _</p>
            <p className="backside__task">6 _ 3 = 3</p>
            <p className="backside__task">2 _ 4 = 6 </p>
          </Task>
          <Task title="А ты сможешь правильно решить пример?" img="https://i.imgur.com/9kX7g67.jpg">
            <p className="backside__task">8 + 2 (2 + 2)</p>
          </Task>
          <Task img="https://i.imgur.com/GgfyVGz.jpg">
            <div className="backside__task">
              Как получить 100 из четырёх девяток с помощью математических действий?
            </div>
          </Task>
        </div>
        <Banner title="Размышляй" img="https://i.imgur.com/OCkBv38.png" />
        <div className="content-items">
          <Task img="https://i.imgur.com/OiQOczy.jpg">
            <div className="backside__task">Сколько цифр ты видишь здесь?</div>
          </Task>
          <Task img="https://i.imgur.com/OyzIkyZ.jpg">
            <div className="backside__task">
              Каждый из троих взрослых ведёт за руку двоих детей. Сколько детей идут со всеми
              взрослыми?
            </div>
          </Task>
          <Task img="https://i.imgur.com/gPM2ukD.jpg">
            <div className="backside__task">
              Серёжа покрасил стороны кубика разными красками. Сколько красок для этого
              потребовалось?
            </div>
          </Task>
        </div>
        <Banner title="Развивайся" img="https://i.imgur.com/OhSHqXf.png" />
        <div className="content-items">
          <Task img="https://i.imgur.com/69P0KyL.jpg">
            <div className="backside__task">
              Благодаря математике известно, что галстук можно завязать 177147 способами
            </div>
          </Task>
          <Task img="https://i.imgur.com/Dvco5Ha.jpg">
            <div className="backside__task">
              Писатель Льюисс Кэролл, который написал «Алиса в стране чудес», был математиком
            </div>
          </Task>
          <Task img="https://i.imgur.com/d2TSFYs.jpg">
            <div className="backside__task">
              Тремя касаниями ножа торт делится на 8 одинаковых частей. И существует только 2
              способа для этого
            </div>
          </Task>
        </div>
      </div>
    </div>
  );
};

export default Home;
