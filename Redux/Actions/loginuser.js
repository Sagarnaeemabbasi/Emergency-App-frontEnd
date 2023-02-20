import axios from 'axios';

const serverUrl = 'https://pink-brainy-catfish.cyclic.app/api';

const loginUser = (email, password) => async dispatch => {
  dispatch({type: 'loginRequest'});
  await axios
    .post(
      `${serverUrl}/login`,
      {email, password},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then(data => {
      dispatch({type: 'loginSuccess', payload: data.data});
    })
    .catch(error => {
      dispatch({type: 'loginFailure', payload: error.response.data.message});
    });
};

const logoutUser = () => async dispatch => {
  dispatch({type: 'logoutRequest'});
  await axios
    .get(`${serverUrl}/logout`)
    .then(data => {
      dispatch({type: 'logoutSuccess', payload: data.data});
      console.log('this is then');
    })
    .catch(error => {
      dispatch({
        type: 'logoutFailure',
        message: dispatch.response.data.message,
      });
      console.log('this is catch');
    });
};
const getUser = () => async dispatch => {
  dispatch({type: 'loadUserRequest'});

  axios
    .get(`${serverUrl}/getprofile`)
    .then(data => {
      dispatch({type: 'loadUserSuccess', payload: data.data});
    })
    .catch(error => {
      dispatch({type: 'loadUserFailure', payload: error.response.data.message});
    });
};

const VerifyUser = otp => async dispatch => {
  dispatch({type: 'verificationRequest'});

  axios
    .post(`${serverUrl}/verify`, otp)
    .then(data => {
      dispatch({type: 'verificationSuccess', payload: data.data});
      console.log(data);
    })
    .catch(error => {
      dispatch({
        type: 'verificationFailure',
        payload: error.response.data.message,
      });
    });
};
export {loginUser, logoutUser, getUser, VerifyUser};
