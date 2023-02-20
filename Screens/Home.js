import React, {useState} from 'react';
import {View} from 'react-native';
import Styles from '../Styling';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyButton from '../Components/MyButton';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const dispatch = useDispatch();
  const {error, message, loading} = useSelector(state => state.message);
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();
  useEffect(() => {
    if (error) {
      alert(error);
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
    console.log(user);
  }, [error, message, dispatch]);
  const tabScreens = [
    {
      name: 'Police',
      text: 'Police',
      route: 'police',
    },
    {
      name: 'Ambulance',
      text: 'Ambulance',
      route: 'ambulance',
    },
    {
      name: 'Firebrigade',
      text: 'Firebrigade',
      route: 'firebrigade',
    },
  ];
  return (
    <>
      <View style={{backgroundColor: '#eeeeee', flex: 1}}>
        <View style={[Styles.p2, Styles.w100]}>
          {tabScreens.map(element => {
            return (
              <MyButton
                key={element.name}
                TextStyle="white"
                text={element.text}
                onPress={() => navigation.navigate(element.route)}
              />
            );
          })}
        </View>
      </View>
    </>
  );
}
