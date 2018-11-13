// Adapted from https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
const { NavigationActions, StackActions } = require('react-navigation');

const internals = {
    navigator: null
};

exports.navigate = (routeName, key = null, params = {}) => {

    return internals.navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            key,
            params
        })
    );
};

exports.replace = (routeName) => {

    return internals.navigator.dispatch(
        StackActions.replace({
            routeName
        })
    );
};

exports.reset = (routeName) => {

    return internals.navigator.dispatch(
        StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        })
    );
};

exports.setTopLevelNavigator = (navigatorRef) => {

    internals.navigator = navigatorRef;
};
