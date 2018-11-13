const React = require('react');
const T = require('prop-types');
const { Provider } = require('react-redux');
const { StyleProvider } = require('native-base');
const GetTheme = require('base-theme/components').default;
const Theme = require('base-theme/variables/material').default;

module.exports = class App extends React.PureComponent {

    static propTypes = {
        store: T.object.isRequired,
        children: T.node.isRequired
    }

    render() {

        const { store, children } = this.props;

        return (

            <Provider store={store}>
                <StyleProvider style={GetTheme(Theme)}>
                    {children}
                </StyleProvider>
            </Provider>
        );
    }
};
