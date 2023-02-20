import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../Styling';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
const Footer = () => {
  const navigation = useNavigation();
  const tabScreens = [
    {
      name: 'home',
      text: 'Home',
      route: 'home',
    },
    {
      name: 'logout',
      text: 'logut',
      route: 'logout',
    },
  ];
  return (
    <View style={[styles.Footer, {position: 'absolute', left: 0, bottom: 0}]}>
      <View
        style={[
          styles.alignItemsCenter,
          styles.justifyContentAround,
          {flexDirection: 'row'},
        ]}>
        {tabScreens.map(element => {
          return (
            <TouchableOpacity
              key={element.name}
              onPress={() => navigation.navigate(element.route)}>
              <Icon
                name={element.name}
                size={30}
                color="white"
                style={styles.textCenter}
              />
              <Text style={[styles.textStyleWhite]}>{element.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Footer;
