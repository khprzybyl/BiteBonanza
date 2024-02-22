import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import { fetchMealDetails } from '../api/api.ts';
import { DEFAULT_IMAGE } from '../constants/Images.ts';
import { BackButton } from '../components/BackButton.tsx';

export const MealDetails = ({ navigation, route }) => {
    const { mealId } = route.params;

    const [mealDetails, setMealDetails] = useState(null);

    useEffect(() => {
        const getMealDetails = async () => {
            const details = await fetchMealDetails(mealId);
            if (details) {
                setMealDetails(details);
            } else {
                console.log(`No details found for mealId ${mealId}`);
            }
        };

        getMealDetails();
    }, [mealId]);

    if (mealDetails) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image
                        source={{ uri: mealDetails?.picture || DEFAULT_IMAGE }}
                        style={styles.image}
                        onError={({ nativeEvent: { error } }) => {
                            console.log('Image loading error:', error);
                            setMealDetails((prevState) => ({
                                ...prevState,
                                picture: DEFAULT_IMAGE,
                            }));
                        }}
                    />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title}>{mealDetails?.title}</Text>
                        <Text style={styles.description}>
                            {mealDetails?.description}
                        </Text>
                        <Text style={styles.ingredientsTitle}>Ingredients</Text>
                        {mealDetails?.ingredients
                            .split(',')
                            .map((ingredient, index) => (
                                <Text key={index} style={styles.ingredients}>
                                    {ingredient.trim()}
                                </Text>
                            ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 15,
        textAlign: 'left',
    },
    description: {
        fontSize: 20,
        fontWeight: 'normal',
        paddingLeft: 15,
        paddingRight: 15,
        lineHeight: 26,
        marginBottom: 15,
    },
    ingredientsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15,
    },
    ingredients: {
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    detailsContainer: {
        marginBottom: 50,
        backgroundColor: 'transparent',
    },
});
