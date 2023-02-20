import axios from 'axios';

const serverUrl = 'https://pink-brainy-catfish.cyclic.app/api';
const signUpUser = formData => async dispatch => {
  dispatch({type: 'signupRequest'});
  await axios
    .post(`${serverUrl}/signup`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(data => {
      dispatch({type: 'signupSuccess', payload: data.data});
    })
    .catch(err => {
      dispatch({type: 'signupFailure', payload: err.response.data.message});
    });
};

export {signUpUser};
