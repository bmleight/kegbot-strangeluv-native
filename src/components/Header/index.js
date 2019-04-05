const React = require('react');
const T = require('prop-types');
const { Header, Body, Right, Button, Icon, Title } = require('native-base');

module.exports = class Header extends React.PureComponent {

    static propTypes = {
        hasFace: T.bool,
        title: T.string
    };

    render() {

        const { title, hasFace } = this.props;

        return (

            <Header {...this.props}>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    {hasFace &&
                        <Icon name='person' style={{ fontSize: 20, color: 'white' }} />
                    }
                </Right>
            </Header>
        );
    }
};
