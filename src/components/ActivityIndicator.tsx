import React from 'react';
import { StyleSheet, View, ActivityIndicator as Indicator } from 'react-native';

interface Props {
    testID?: string;
}

export const ActivityIndicator: React.FC<Props> = ({ testID }) => {
    return (
        <View style={styles.loader}>
            <Indicator size="large" color="#2E0F86" testID={testID} />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
