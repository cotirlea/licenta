import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { loadingStyle } from './LoadingStyle';

const Loading = () => {
  return (
    <View style={loadingStyle.container}>
      <ActivityIndicator size={100} color="#d0d616" />
      <Text style={loadingStyle.loadingText}>Loading...</Text>
    </View>
  );
};


export default Loading;
