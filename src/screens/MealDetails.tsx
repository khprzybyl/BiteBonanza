import { StyleSheet, Text, View } from 'react-native';

export const MealDetails = () => {
  return (
    <View style={styles.container}>
      <Text>MealDetails</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});