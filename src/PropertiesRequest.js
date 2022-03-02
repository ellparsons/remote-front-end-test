import axios from 'axios';

const FetchProperties = () => {
  try {
    return axios.get('/api/properties')
      .then((response) => {
        return { properties: response.data, error: null };
      })
      .catch((error) => {
        return { properties: null, error: error };
      })
  } catch (error) {
    return { properties: null, error: error };
  }
};

export default FetchProperties;
