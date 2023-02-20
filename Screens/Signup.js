import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MyCheckbox from '../Components/MyCheckbox';
import Styles from '../Styling';
import MyModal from '../Components/MyModal';
import Loader from '../Components/Loader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser} from '../Redux/Actions/SignUpUser';

export default function SignUp({navigation}) {
  const [details, setDetails] = useState({});
  const [isSelected, setSelection] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [myImage, setMyImage] = useState('');

  const {authLoading, signupError, signupMessage} = useSelector(
    state => state.auth,
  );

  const dispatch = useDispatch();

  async function signup() {
    const dataToSent = {
      name: details.name,
      email: details.email,
      password: details.password,
    };
    await dispatch(signUpUser(dataToSent));
    setDetails({
      name: '',
      email: '',
      password: '',
    });
  }

  const pickImage = async () => {
    const res = await launchCamera({
      mediaType: 'photo',
      cameraType: 'front',
    });
    const {uri} = res.assets[0];
    setMyImage(uri);
  };
  const goToGallery = async () => {
    const res = await launchImageLibrary({
      mediaType: 'mixed',
    });
    const {uri} = res.assets[0];

    setMyImage(uri);
  };
  const disabledBtn =
    !isSelected || !details.password || !details.name || !details.email;
  useEffect(() => {
    if (signupError) {
      setModalVisible(true);
      setModalText(signupError);
      dispatch({type: 'clearError'});
    }
    if (signupMessage) {
      ToastAndroid.show(signupMessage, 4000);
      dispatch({type: 'clearMessage'});
    }
  }, [dispatch, signupError, signupMessage, authLoading]);
  return (
    <>
      <MyModal
        mainText={modalText}
        buttonText="cancel"
        visible={modalVisible}
        onPress={() => {
          setModalVisible(!modalVisible);
          setSelection(false);
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <ScrollView>
        <View style={{backgroundColor: '#eeeeee', flex: 1}}>
          <Text
            style={[
              Styles.textCenter,
              {padding: 15, fontSize: 40, color: 'darkgreen', marginTop: 10},
            ]}>
            SIGN UP
          </Text>
          <TextInput
            keyboardType="default"
            value={details && details.name}
            onChangeText={e => {
              setDetails({...details, name: e});
            }}
            style={[Styles.myInput, Styles.textCenter]}
            placeholder="name"
          />
          <TextInput
            keyboardType="email-address"
            value={details && details.email}
            onChangeText={e => {
              setDetails({...details, email: e});
            }}
            style={[Styles.myInput, Styles.textCenter]}
            placeholder="e-mail"
          />
          <TextInput
            keyboardType="default"
            value={details && details.password}
            onChangeText={e => {
              setDetails({...details, password: e});
            }}
            style={[Styles.myInput, Styles.textCenter]}
            placeholder="password"
            secureTextEntry={true}
          />
          <MyCheckbox
            text="Accept the term and policies"
            value={isSelected}
            onValueChange={() => {
              setSelection(!isSelected);
            }}
          />
          <View style={[Styles.px2, Styles.w100]}>
            <TouchableOpacity
              style={[
                Styles.btn,
                {
                  backgroundColor: disabledBtn ? 'black' : 'darkgreen',
                },
              ]}
              disabled={disabledBtn}
              onPress={signup}>
              {authLoading ? (
                <Loader color="fuchsia" size="small" />
              ) : (
                <Text style={[Styles.textWhite, Styles.textCenter, Styles.fs2]}>
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
