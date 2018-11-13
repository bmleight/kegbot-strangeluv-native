const { AsyncStorage } = require('react-native');
const AuthActions = require('actions/auth');
const AuthSelectors = require('selectors/auth');

module.exports = (store) => {

    const getIsAuthenticated = () => AuthSelectors.getIsAuthenticated(store.getState());
    const getToken = () => AuthSelectors.getToken(store.getState());

    AsyncStorage.getItem('token', (err, token) => {

        if (err) {
            console.warn('set token error ' + JSON.stringify(err));
        }

        if (token) {
            store.dispatch(AuthActions.login({ token }));
        }
    });

    store.subscribe(() => {

        if (getIsAuthenticated()) {

            const token = getToken();

            AsyncStorage.setItem('token', token, (err) => {

                if (err) {
                    console.warn('set token error ' + JSON.stringify(err));
                }
            });
        }
        else {

            AsyncStorage.removeItem('token', (err) => {

                if (err) {
                    console.warn('remove token error ' + JSON.stringify(err));
                }
            });
        }
    });
};
