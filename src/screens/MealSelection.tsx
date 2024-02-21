import { StyleSheet, Text, View } from 'react-native';

export const MealSelection = () => {
    return (
        <View style={styles.container}>
            <Text>Meal Selection</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
