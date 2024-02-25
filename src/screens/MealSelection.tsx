import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Text,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MealCard } from '../components/MealCard';
import { Error } from '../components/Error';
import { ActivityIndicator } from '../components/ActivityIndicator';
import { UseMealsQuery } from '../hooks/useMealsQuery';
import { RootStackParamList } from '../types/navigationTypes';
import { Meal } from '../types/mealTypes';

interface MealSelectionProps {
    navigation: StackNavigationProp<RootStackParamList, 'MealSelection'>;
}

export const MealSelection: React.FC<MealSelectionProps> = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [offset, setOffset] = useState(0);

    const { data, isLoading, error } = UseMealsQuery(offset);

    const handleRefresh = () => {
        if (offset === 8) {
            setOffset((prevOffset) => (prevOffset = 0));
        } else {
            setOffset((prevOffset) => prevOffset + 4);
        }
    };

    if (isLoading) {
        return <ActivityIndicator testID="loading-indicator" />;
    }

    if (error) {
        return <Error />;
    }

    const renderItem = ({ item, index }: { item: Meal; index: number }) => (
        <MealCard
            key={item?.id}
            style={index % 2 === 0 ? { marginRight: 22 } : null}
            imageSrc={item?.picture}
            title={item?.title}
            onPress={() =>
                navigation.navigate('MealDetails', { mealId: item.id })
            }
            testID={`meal-item-${item.id}`}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList
                    data={data}
                    numColumns={2}
                    keyExtractor={(item) => String(item?.id)}
                    ListEmptyComponent={
                        <Text style={styles.empty}>No meals data</Text>
                    }
                    renderItem={renderItem}
                />
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
        margin: 22,
        marginTop: 70,
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
