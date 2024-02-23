import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';
import { BackButton } from '../components/BackButton';

const useHeaderOptions = (navigation: NavigationProp<RootStackParamList>) => {
    React.useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerLeft: () => <BackButton />,
            headerTitle: '',
        });
    }, [navigation]);
};

export default useHeaderOptions;
