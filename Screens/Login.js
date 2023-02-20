import React, {useState} from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MyModal from '../Components/MyModal';
import Styles from '../Styling';
import Loader from '../Components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../Redux/Actions/loginuser';
import {useEffect} from 'react';

export default function Login({navigation}) {
  const [details, setDetails] = useState({});
  const [modalText, setModalText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {error, message, isAuthenticated, loginLoading} = useSelector(
    state => state.auth,
  );
  const moveToSignUp = () => {
    navigation.navigate('SignUp');
  };
  const btnDis = !details.email || !details.password;

  async function login() {
    await dispatch(loginUser(details.email, details.password));
    setDetails({
      email: '',
      password: '',
    });
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('home');
    }
    if (error) {
      setModalVisible(true);
      setModalText(error);
      dispatch({type: 'clearError'});
    }
    if (message) {
      ToastAndroid.show(message, 5000);
      dispatch({type: 'clearMessage'});
    }
  }, [dispatch, error, message, loginLoading, isAuthenticated]);

  return (
    <>
      <MyModal
        mainText={modalText}
        buttonText="cancel"
        visible={modalVisible}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <View style={{backgroundColor: '#eeeeee', flex: 1}}>
        <Text
          style={[
            Styles.textCenter,
            {padding: 15, fontSize: 40, color: 'darkgreen', marginTop: 10},
          ]}>
          LOG IN
        </Text>
        <TextInput
          value={details.email}
          keyboardType="email-address"
          onChangeText={e => {
            setDetails({...details, email: e});
          }}
          style={[Styles.myInput, Styles.textCenter]}
          placeholder="Enter Your E-mail"
        />
        <TextInput
          value={details.password}
          onChangeText={e => {
            setDetails({...details, password: e});
          }}
          style={[Styles.myInput, Styles.textCenter]}
          placeholder="password"
          secureTextEntry={true}
        />
        <View style={[Styles.p2, Styles.w100]}>
          <TouchableOpacity
            onPress={login}
            style={[
              Styles.btn,
              {
                backgroundColor: btnDis ? 'black' : 'darkgreen',
              },
            ]}
            disabled={btnDis}>
            {loginLoading ? (
              <Loader color="fuchsia" size="small" />
            ) : (
              <Text style={[Styles.textWhite, Styles.textCenter, Styles.fs4]}>
                Log In
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={[Styles.px2, Styles.w100]}>
          <View style={Styles.checkboxContainer}>
            <Text style={[Styles.m1, {fontSize: 20}]}>Are You New User ?</Text>
            <TouchableOpacity
              style={[Styles.badge, {paddingTop: 5, margin: 9}]}
              onPress={moveToSignUp}>
              <Text style={[Styles.textCenter, Styles.textWhite]}>
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
