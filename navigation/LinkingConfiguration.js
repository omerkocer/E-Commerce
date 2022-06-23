/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
import * as Linking from 'expo-linking';
const linking = {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    Login: {
                        screens: {
                            Login: 'one',
                        },
                    },
                    Home: {
                        screens: {
                            Home: 'home',
                        },
                    },
                    ItemsPage: {
                        screens: {
                            ItemsPage: 'itemspage',
                        },
                    },
                    Items: {
                        screens: {
                            Items: 'items',
                        },
                    },
                },
            },
            Modal: 'modal',
            NotFound: '*',
        },
    },
};
export default linking;
