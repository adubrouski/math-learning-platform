import { getAllTopics, getTopic } from '../../api/index';
import { setTopics, setCurrentTopic } from '../actions/topics';

const fetchTopics = () => async (dispatch) => {
  try {
    const { data } = await getAllTopics();

    dispatch(setTopics({ data, filter: 'topics' }));
  } catch ({ response }) {
    console.log(response);
  }
};

const fetchTopicById = (id) => async (dispatch) => {
  try {
    const { data } = await getTopic(id);

    dispatch(setCurrentTopic({ ...data }));
  } catch ({ response }) {
    console.log(response);
  }
};

export { fetchTopics, fetchTopicById };
