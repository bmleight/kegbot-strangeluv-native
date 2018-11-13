const React = require('react');
const T = require('prop-types');
const DefaultButton = require('components/DefaultButton');
const { Footer } = require('native-base');

module.exports = class FooterNav extends React.PureComponent {

    static propTypes = {
        isAuthenticated: T.bool.isRequired,
        navigation: T.object.isRequired,
        logout: T.func
    };

    render() {

        const { navigation, isAuthenticated, logout } = this.props;

        return (

            <Footer {...this.props}>
                <DefaultButton
                    transparent
                    light
                    onPress={() => navigation.navigate('Home')}
                    icon='home'
                    text='Home'
                    iconLeft
                    iconColor='#fff'
                />
                {!isAuthenticated &&
                    <DefaultButton
                        transparent
                        light
                        onPress={() => navigation.navigate('Login')}
                        icon='log-in'
                        text='Log-in'
                        iconLeft
                        iconColor='#fff'
                    />
                }
                {!isAuthenticated &&
                    <DefaultButton
                        transparent
                        light
                        onPress={() => navigation.navigate('Signup')}
                        icon='person-add'
                        text='Sign-up'
                        iconLeft
                        iconColor='#fff'
                    />
                }
                {isAuthenticated &&
                    <DefaultButton
                        transparent
                        light
                        onPress={() => navigation.navigate('Dashboard')}
                        icon='apps'
                        text='Dashboard'
                        iconLeft
                        iconColor='#fff'
                    />
                }
                {isAuthenticated &&
                    <DefaultButton
                        transparent
                        light
                        onPress={logout}
                        icon='log-out'
                        text='Logout'
                        iconLeft
                        iconColor='#fff'
                    />
                }
            </Footer>
        );
    }
};
