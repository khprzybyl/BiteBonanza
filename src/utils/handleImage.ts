export const getInitialImageUri = (remoteUri?: string) => {
    return remoteUri
        ? { uri: remoteUri }
        : require('../assets/default-image.png');
};

export const defaultImageOnError = () => {
    return require('../assets/default-image.png');
};
