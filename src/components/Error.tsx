import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { layout } from '../constants/Layout';
import { ERROR_FETCHING_DATA } from '../constants/ErrorMessages';

export const Error: React.FC = () => {
    return (
        <View style={styles.error}>
            <Text style={styles.errorMessage}>{ERROR_FETCHING_DATA}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    error: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: layout.window.width - 52,
    },
    errorMessage: {
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 26,
        color: '#BE4A58',
    },
});
