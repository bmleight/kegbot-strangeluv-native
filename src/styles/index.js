const { default: styled } = require('styled-components/native');
const DefaultButton = require('components/DefaultButton');
const FooterNav = require('components/FooterNav');
const { Card, Form, Item, Icon, Input, Text, Container } = require('native-base');

module.exports = {

    ScrollView: styled.ScrollView.attrs({
        contentContainerStyle: {
            padding: 16
        }
    })
    ``,
    Image: styled.Image`
        width: 200px;
        height: 200px;
        margin: 0 auto;
    `,
    Button: styled(DefaultButton)`
        margin: 10px;
    `,
    Input: styled(Input)`
    `,
    FooterNav: styled(FooterNav)`
        padding-top: 4px;
    `,
    Form: styled(Form)`
        padding: 16px 16px 10px 16px;
    `,
    Item: styled(Item)`
        margin-vertical: 8px;
    `,
    Text: styled(Text)`
        margin: 0 auto;
    `,
    Container: styled(Container)`
        background-color: transparent;
    `,
    Card: styled(Card)`
        margin: 10px 0 15px 0;
    `,
    ErrorText: styled(Text)`
        color: red;
        margin: 0 auto;
    `,
    InputIcon: styled(Icon)`
        margin-left: 8px;
    `
};
