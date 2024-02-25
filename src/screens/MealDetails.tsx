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
import { UseMealsQuery } from '../hooks/useMealDetailsQuery';
import useHeaderOptions from '../hooks/useHeaderOptions';
import { Error } from '../components/Error';
import { ActivityIndicator } from '../components/ActivityIndicator';
import { DEFAULT_IMAGE } from '../constants/Images';
import { layout } from '../constants/Layout';
import { RootStackParamList } from '../types/navigationTypes';

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

    const { isLoading, isError, data } = UseMealsQuery(mealId);

    const [imageUri, setImageUri] = useState<string>(DEFAULT_IMAGE);

    useEffect(() => {
        if (data && data.picture) {
            setImageUri(data.picture);
        }
    }, [data]);

    const handleError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
        console.log('Image loading error:', e.nativeEvent.error);
        setImageUri(DEFAULT_IMAGE);
    };

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (isError) {
        return <Error />;
    }

    if (data) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                        onError={handleError}
                    />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title}>{data?.title}</Text>
                        <Text style={styles.description}>
                            {data?.description}
                        </Text>
                        <Text style={styles.ingredientsTitle}>Ingredients</Text>
                        {data?.ingredients
                            ? data.ingredients
                                  .split(',')
                                  .map((ingredient, index) => (
                                      <Text
                                          key={index}
                                          style={styles.ingredients}
                                      >
                                          {ingredient.trim()}
                                      </Text>
                                  ))
                            : null}
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
        width: layout.window.width - 52,
        alignSelf: 'center',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 17,
        textAlign: 'left',
    },
    description: {
        fontSize: 20,
        fontWeight: 'normal',
        lineHeight: 26,
        marginBottom: 24,
    },
    ingredientsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 17,
    },
    ingredients: {
        fontSize: 20,
        paddingBottom: 17,
    },
    image: {
        width: layout.window.width - 52,
        aspectRatio: 1,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 17,
    },
    detailsContainer: {
        marginBottom: 50,
        backgroundColor: 'transparent',
    },
});
