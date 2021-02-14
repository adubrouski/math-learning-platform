import React from 'react';
import { Link } from 'react-router-dom';

import './TopicsBoard.sass';

const TopicsBoard = ({ topics, title }) => {
  return (
    <div className="topics-board">
      <h3 className="topics-board-title">{title}</h3>
      <div className="topics-board-card">
        <ul>
          {topics.map((item) => (
            <li key={item.id}>
              <Link to={`/topics/topic/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopicsBoard;
