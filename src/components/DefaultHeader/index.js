const React = require('react');
const T = require('prop-types');
const { Header, Left, Body, Right, Button, Icon, Title } = require('native-base');

module.exports = class DefaultHeader extends React.PureComponent {

    static propTypes = {
        goBack: T.func,
        openMenu: T.func,
        title: T.string
    };

    render() {

        const { goBack, title, openMenu } = this.props;

        return (

            <Header {...this.props}>
                <Left>
                    {goBack &&
                        <Button transparent onPress={() => goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    }
                    {!goBack &&
                    <Button transparent>
                        <Icon name='home' />
                    </Button>
                    }
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    {openMenu &&
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    }
                </Right>
            </Header>
        );
    }
};
