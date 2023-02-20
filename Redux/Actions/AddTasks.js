import axios from 'axios';

const serverUrl = 'https://pink-brainy-catfish.cyclic.app/api';

const addQuery = (longitude, latitude, query) => async dispatch => {
  dispatch({type: 'addQueryRequest'});

  axios
    .post(
      `${serverUrl}/query`,
      {longitude, latitude, query},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then(data => {
      dispatch({type: 'addQuerySuccess', payload: data.data.message});
    })
    .catch(error => {
      dispatch({
        type: 'addQueryFailure',
        payload: error.response.data.message,
      });
    });
};

const updateName = name => async dispatch => {
  dispatch({type: 'addTaskRequest'});

  axios
    .put(
      `${serverUrl}/updateprofile`,
      {name},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then(data => {
      dispatch({type: 'addTaskSuccess', payload: data.data.message});
    })
    .catch(error => {
      dispatch({type: 'addTaskFailure', payload: error.response.data.message});
    });
};
export {addQuery, updateName};
