import React from 'react';
import styles from '../Styling';
import CheckBox from '@react-native-community/checkbox';
import {Text, View} from 'react-native';

function MyCheckbox(props) {
  const {text, value, onValueChange} = props;
  return (
    <View style={[styles.px2, {paddingTop:16}, styles.w100]}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={value}
          onValueChange={onValueChange}
          style={styles.checkbox}
        />
        <Text style={[styles.m1,{fontSize:20}]}>{text}</Text>
      </View>
    </View>
  );
}
export default MyCheckbox;
