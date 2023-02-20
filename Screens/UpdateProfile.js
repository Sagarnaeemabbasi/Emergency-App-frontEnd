import React, {useState} from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import MyModal from '../Components/MyModal';
import Styles from '../Styling';
import Loader from '../Components/Loader';
import {updateName} from '../Redux/Actions/AddTasks';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const UpdateProfile = () => {
  const {user} = useSelector(state => state.auth);
  const [name, setName] = useState(user.name);
  const [modalText, setModalText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {error, message, loading} = useSelector(state => state.message);
  const addTasksToList = async () => {
    await dispatch(updateName(name));
  };
  useEffect(() => {
    if (error) {
      setModalVisible(true);
      setModalText(error);
      dispatch({type: 'clearError'});
      return;
    }
    if (message) {
      setModalVisible(true);
      setModalText(message);
      dispatch({type: 'clearMessage'});
    }
  }, [error, message, dispatch]);
  return (
    <>
      <ScrollView>
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
          <TextInput
            value={name}
            keyboardType="default"
            onChangeText={setName}
            style={[Styles.myInput, Styles.textCenter]}
            placeholder="Enter Your New Name "
          />

          <View style={[Styles.p2, Styles.w100]}>
            <TouchableOpacity
              onPress={addTasksToList}
              style={[
                Styles.btn,
                {
                  backgroundColor: !name ? 'black' : 'darkblue',
                },
              ]}
              disabled={!name}>
              {loading ? (
                <Loader color="fuchsia" size="small" />
              ) : (
                <Text style={[Styles.textWhite, Styles.textCenter, Styles.fs4]}>
                  Update Name
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default UpdateProfile;
