import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';


type CustomTitle = {
  title?: string;
}

const MenuBar: React.FC<CustomTitle> = ({ title }) => {

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon="file" />
        <Appbar.Content title={title} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="close" onPress={() => {}} />
      </Appbar.Header>
    </View>
  );
};

export default MenuBar;

const styles = StyleSheet.create({});