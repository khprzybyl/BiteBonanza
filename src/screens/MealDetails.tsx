import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    NativeSyntheticEvent,
    ImageErrorEventData,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { fetchMealDetails } from '../api/api';
import useHeaderOptions from '../hooks/useHeaderOptions';
import { RootStackParamList } from '../types/navigationTypes';
import { MealDetailsTypes } from '../types/mealTypes';
import { DEFAULT_IMAGE } from '../constants/Images';


type MealDetailsScreenRouteProp = RouteProp<
    { MealDetails: { mealId: number } },
    'MealDetails'
>;

type MealDetailsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MealDetails'
>;

interface MealDetailsProps {
    navigation: MealDetailsScreenNavigationProp;
    route: MealDetailsScreenRouteProp;
}

export const MealDetails: React.FC<MealDetailsProps> = ({
    navigation,
    route,
}) => {
    useHeaderOptions(navigation);
    const { mealId } = route.params;

    const [mealDetails, setMealDetails] = useState<MealDetailsTypes | null>(
        null,
    );

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

    const handleError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        console.log('Image loading error:', e.nativeEvent.error);
        setMealDetails((prevState) => {
            if (!prevState) return null;
            return { ...prevState, picture: DEFAULT_IMAGE };
        });
    };

    if (mealDetails) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image
                        source={{ uri: mealDetails?.picture || DEFAULT_IMAGE }}
                        style={styles.image}
                        onError={handleError}
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
        marginTop: 70,
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
