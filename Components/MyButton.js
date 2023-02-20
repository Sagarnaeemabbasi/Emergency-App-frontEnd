import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Styles from '../Styling';
import Loader from './Loader';

export default function MyButton(props) {
  const {onPress, text, style, loading, disabled, TextStyle} = props;
  return (
    <View
      style={[{paddingRight: 15, paddingLeft: 15, paddingTop: 3}, Styles.w100]}>
      <TouchableOpacity
        style={[Styles.btn, style]}
        onPress={onPress}
        disabled={disabled}>
        {loading ? (
          <Loader color="fuchsia" size="small" />
        ) : (
          <Text
            style={[
              Styles.textCenter,
              Styles.fs4,
              {color:TextStyle},
            ]}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
