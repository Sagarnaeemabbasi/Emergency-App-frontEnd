import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Map from './Map';
import Styles from '../Styling';
import MyButton from '../Components/MyButton';
import {useDispatch, useSelector} from 'react-redux';
import {addQuery} from '../Redux/Actions/AddTasks';
import MyModal from '../Components/MyModal';
import Geolocation from '@react-native-community/geolocation';

const Ambulance = ({navigation}) => {
  const [myLocation, setMyLocation] = useState({});
  const getMyCurrentPosition = async () => {
    await Geolocation.getCurrentPosition(data =>
      setMyLocation({...data.coords}),
    );
  };

  const dispatch = useDispatch();
  const addQueryToDatabase = query => {
    console.log(query);

    dispatch(addQuery(longitude, latitude, query));
  };
  const {queryLoading, queryMessage, queryError} = useSelector(
    state => state.message,
  );
  const options = [
    {
      name: 'Medical Emergency /Ambulance',
      text: 'Medical Emergency',
    },
    {
      name: 'Fire /Ambulance',
      text: 'Fire',
    },
    {
      name: 'Accident /Ambulance',
      text: 'Accident',
    },
  ];
  const [modalText, setModalText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (queryError) {
      setModalVisible(true);
      setModalText(queryError);
      dispatch({type: 'clearError'});
      return;
    }
    if (queryMessage) {
      setModalVisible(true);
      setModalText(queryMessage);
      dispatch({type: 'clearMessage'});
      return;
    }
    getMyCurrentPosition();
  }, [dispatch, queryMessage, queryError, queryLoading]);
  const {longitude, latitude} = myLocation;
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
      <ScrollView>
        <Map longitude={longitude} latitude={latitude} />
        <View style={[Styles.w100]}>
          {options &&
            options.map(element => {
              return (
                <MyButton
                  key={element.text}
                  text={element.text}
                  onPress={() => addQueryToDatabase(element.name)}
                  TextStyle="white"
                />
              );
            })}
          <MyButton
            text="Back"
            TextStyle="red"
            onPress={() => navigation.navigate('home')}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Ambulance;
