const { createStackNavigator: CreateStackNavigator } = require('react-navigation');

module.exports = (store) => {

    const Screens = require('screens')(store);

    if (!Screens.routeConfig || !Screens.initialRouteName) {
        throw new Error('Screens must export props "routeConfig" and "initialRouteName"');
    }

    const AppNavigator = CreateStackNavigator(
        Screens.routeConfig,
        {
            initialRouteName: Screens.initialRouteName
        }
    );

    return AppNavigator;
};
