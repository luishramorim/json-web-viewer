import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const MenuBar = () => {

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon="file" />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="close" onPress={() => {}} />
      </Appbar.Header>
    </View>
  );
};

export default MenuBar;

const styles = StyleSheet.create({});