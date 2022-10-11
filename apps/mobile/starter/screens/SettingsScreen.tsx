import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function SettingsScreen({ navigation }: RootTabScreenProps<'Settings'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
