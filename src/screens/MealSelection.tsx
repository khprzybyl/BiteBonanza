import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Text,
    View,
} from 'react-native';
import { MealCard } from '../components/MealCard.tsx';
import { useNavigation } from '@react-navigation/native';
import { fetchMeals } from '../api/api.ts';
import { ActivityIndicator } from 'react-native';

export const MealSelection = () => {
    const navigation = useNavigation();
    const [meals, setMeals] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMeals = async () => {
            try {
                setIsLoading(true);
                let fetchedMeals = await fetchMeals(4, offset);
                let additionalMeals = [];
                if (fetchedMeals.length < 4) {
                    additionalMeals = await fetchMeals(
                        4 - fetchedMeals.length,
                        0,
                    );
                }
                setMeals([...fetchedMeals, ...additionalMeals]);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getMeals();
    }, [offset]);

    const handleRefresh = () => {
        setOffset((prevOffset) => prevOffset + 4);
    };

    const renderItem = ({ item, index }) => (
        <MealCard
            key={item?.id}
            style={index % 2 === 0 ? { marginRight: 22 } : null}
            imageSrc={item?.picture}
            title={item?.title}
            onPress={() =>
                navigation.navigate('MealDetails', { mealId: item.id })
            }
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#2E0F86" />
                ) : (
                    <FlatList
                        data={meals}
                        numColumns={2}
                        keyExtractor={(item) => String(item?.id)}
                        ListEmptyComponent={
                            <Text style={styles.empty}>No meals data</Text>
                        }
                        renderItem={renderItem}
                    />
                )}
            </View>
            <TouchableOpacity
                onPress={handleRefresh}
                style={styles.refreshButton}
                accessibilityLabel="Refresh meals list"
                accessibilityHint="Updates the list of meals with new items"
                accessibilityRole="button"
            >
                <Text style={styles.button}>{textButton}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 15,
        marginTop: 50,
        flex: 1,
    },
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    refreshButton: {
        backgroundColor: '#2E0F86',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        paddingHorizontal: 20,
        borderRadius: '100%',
        width: '100%',
        marginTop: 10,
    },

    button: {
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: '#ffffff',
    },
});
