const React = require('react');
const T = require('prop-types');
const { CardItem } = require('native-base');
const { ScrollView, FooterNav, Container, Card, Text, Image } = require('styles');

module.exports = class HomeView extends React.PureComponent {

    static propTypes = {
        navigation: T.object.isRequired,
        logout: T.func.isRequired
    };

    render() {

        return (

            <Container>
                <ScrollView>
                    <Card>
                        <CardItem header bordered>
                            <Text>It is a very cool dashboard!</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={require('../assets/icon.png')} />
                        </CardItem>
                        <CardItem>
                            <Text>Things can be here and stuff.</Text>
                        </CardItem>
                        <CardItem footer bordered>
                            <Text>Make me something cool!</Text>
                        </CardItem>
                    </Card>
                </ScrollView>
                <FooterNav {...this.props} />
            </Container>
        );
    }
};
