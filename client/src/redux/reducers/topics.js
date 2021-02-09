const initState = {
  isLoaded: false,
  filter: null,
  topics: {},
  currentTopic: null,
};

const topics = (state = initState, action) => {
  switch (action.type) {
    case 'SET_TOPICS':
      return {
        ...state,
        topics: action.payload.data,
        filter: action.payload.filter,
        isLoaded: true,
      };
    case 'SET_CURRENT_TOPIC':
      return {
        ...state,
        currentTopic: action.topic,
        isLoaded: true,
      };
    default:
      return state;
  }
};

export default topics;
