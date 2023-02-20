import {ToastAndroid, View} from 'react-native';
import React, {useEffect} from 'react';
import MyButton from '../Components/MyButton';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../Redux/Actions/loginuser';

const Logout = ({navigation}) => {
  const {loading, error, message} = useSelector(state => state.auth);
  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, 5000);
      dispatch({type: 'clearError'});
    }
    if (message) {
      ToastAndroid.show(message, 5000);

      dispatch({type: 'clearMessage'});
    }
  }, [dispatch, error, message, loading]);
  const dispatch = useDispatch();
  const logout = async () => {
    await dispatch(logoutUser());
    navigation.navigate('LogIn');
  };
  return (
    <View>
      <MyButton text="logout" TextStyle="white" loading={loading} onPress={logout} />
    </View>
  );
};

export default Logout;
