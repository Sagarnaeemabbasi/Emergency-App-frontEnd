import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function Loader(props) {
  const {size, color, style} = props;
  return <ActivityIndicator style={style} size={size} color={color} />;
}
