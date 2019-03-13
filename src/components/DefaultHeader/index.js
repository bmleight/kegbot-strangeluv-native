const React = require('react');
const T = require('prop-types');
const { Header, Body, Right, Button, Icon, Title } = require('native-base');

module.exports = class DefaultHeader extends React.PureComponent {

    static propTypes = {
        openMenu: T.func,
        title: T.string
    };

    render() {

        const { title, openMenu } = this.props;

        return (

            <Header {...this.props}>
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
