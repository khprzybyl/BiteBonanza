import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    ViewStyle,
} from 'react-native';
import { layout } from '../constants/Layout';
import { DEFAULT_IMAGE } from '../constants/Images';

interface MealCardProps {
    onPress: () => void;
    imageSrc: string;
    title: string;
    style?: ViewStyle | null;
    testID?: string;
}

export const MealCard: React.FC<MealCardProps> = ({
    onPress,
    imageSrc,
    title,
    style,
    testID,
}) => {
    const [imageSource, setImageSource] = useState<string>(imageSrc);

    const handleImageError = () => {
        setImageSource(DEFAULT_IMAGE);
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, style]}
            testID={testID}
        >
            <Image
                source={{ uri: imageSource }}
                style={styles.image}
                onError={handleImageError}
            />
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        color: '#2E0F86',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
        flexWrap: 'wrap',
        maxWidth: (layout.window.width - 68) / 2,
        textAlign: 'left',
        lineHeight: 26,
    },
    image: {
        width: (layout.window.width - 68) / 2,
        aspectRatio: 1,
        resizeMode: 'cover',
        borderRadius: 17,
    },
});
