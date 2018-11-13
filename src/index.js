const React = require('react');
const ReactNative = require('react-native');

const AppRegistry = ReactNative.AppRegistry;
const AppContainer = require('containers/App');
const CreateReactClass = require('create-react-class');
const CreateStore = require('wiring/create-store');
const Initializers = require('initializers');
const NavigationService = require('navigators/navigation-service');

require('../globals');

if (__DEV__) {

    // Allows you to see network requests in Chrome's Network tab
    // when you have the react-native remote debugger open
    global.XMLHttpRequest = global.originalXMLHttpRequest ?
        global.originalXMLHttpRequest :
        global.XMLHttpRequest;

    global.FormData = global.originalFormData ?
        global.originalFormData :
        global.FormData;
}

// TODO: Empty object until we get persistant storage hooked up
const store = CreateStore({});

Initializers.run(store);

module.exports = () => {

    const RootNavigator = require('./navigators/RootNavigator')(store);

    const AppContainerClass = CreateReactClass({

        render() {

            return (
                <AppContainer store={store}>
                    <RootNavigator
                        ref={(navigatorRef) => {

                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </AppContainer>
            );
        }
    });

    // register with the AppRegistery and :rocket: into space!
    AppRegistry.registerComponent('kegbotnative', () => AppContainerClass);
};
