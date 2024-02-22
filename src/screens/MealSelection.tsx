import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MealCard } from '../components/MealCard';
import { fetchMeals } from '../api/api';
import { RootStackParamList } from '../types/navigationTypes';
import { Meal } from '../types/mealTypes';

interface MealSelectionProps {
    navigation: StackNavigationProp<RootStackParamList, 'MealSelection'>;
}

export const MealSelection: React.FC<MealSelectionProps> = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMoreMeals, setHasMoreMeals] = useState<boolean>(true);

    useEffect(() => {
        const getMeals = async () => {
            try {
                setIsLoading(true);
                let fetchedMeals = await fetchMeals(4, offset);
                let additionalMeals: Meal[] = [];

                if (fetchedMeals && fetchedMeals.length < 4) {
                    setHasMoreMeals(false);
                    additionalMeals =
                        (await fetchMeals(4 - fetchedMeals.length, 0)) || [];
                } else {
                    setHasMoreMeals(true);
                }

                setMeals([...(fetchedMeals || []), ...additionalMeals]);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getMeals();
    }, [offset]);

    const handleRefresh = () => {
        setOffset((prevOffset) => (hasMoreMeals ? prevOffset + 4 : 0));
    };

    const renderItem = ({ item, index }: { item: Meal; index: number }) => (
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
                <Text style={styles.button}>REFRESH</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 70,
        margin: 15,
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
        height: 80,
        paddingHorizontal: 20,
        borderRadius: 40,
        width: '100%',
        marginTop: 5,
    },
    button: {
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: '#ffffff',
    },
    empty: {
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        padding: 20,
    },
});
