import React from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import { DEFAULT_IMAGE } from '../constants/Images.ts';
import { layout } from '../constants/Layout.ts';

export const MealCard = ({ onPress, imageSrc, title, style }) => {
    const [imageSource, setImageSource] = useState(imageSrc);

    const handleImageError = () => {
        setImageSource(DEFAULT_IMAGE);
    };

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
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
        padding: 3,
        marginBottom: 10,
    },
    title: {
        color: '#2E0F86',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        flexWrap: 'wrap',
        maxWidth: (layout.window.width - 68) / 2,
        textAlign: 'center',
        lineHeight: 26,
    },
    image: {
        width: (layout.window.width - 68) / 2,
        aspectRatio: 1,
        resizeMode: 'cover',
        borderRadius: 17,
    },
});
