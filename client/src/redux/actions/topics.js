const setTopics = (payload) => ({
  type: 'SET_TOPICS',
  payload,
});

const setCurrentTopic = (topic) => ({
  type: 'SET_CURRENT_TOPIC',
  topic,
});

export { setTopics, setCurrentTopic };
