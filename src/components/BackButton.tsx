import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const BackButton = () => {
    const navigation = useNavigation();

    const onBack = () => navigation.goBack();

    return (
        <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            accessibilityLabel="Go back"
            accessibilityHint="Go back to prvious screen"
            accessibilityRole="button"
        >
            <Ionicons name="arrow-back-outline" size={25} color="black" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        padding: 10,
    },
    back: {
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginBottom: 15,
        width: 20,
        height: 20,
    },
});
