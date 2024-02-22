import React from 'react';
import { BackButton } from '../components/BackButton.tsx';

const useHeaderOptions = (navigation) => {
    React.useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerLeft: () => <BackButton />,
            headerTitle: '',
        });
    }, [navigation]);
};

export default useHeaderOptions;
