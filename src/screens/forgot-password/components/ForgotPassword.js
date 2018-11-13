const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');
const { CardItem } = require('native-base');
const { Button, Card, Input, ScrollView, ErrorText, Text, Item, Form, InputIcon } = require('styles');

module.exports = class ForgotPassword extends StrangeForms(React.PureComponent) {

    static propTypes = {
        requestReset: T.func.isRequired,
        errorMessage: T.string,
        clearErrors: T.func.isRequired
    };

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            hasEmailBlurred: false
        };

        this.showEmailError = this._showEmailError.bind(this);
        this.emailFieldBlurred = this._emailFieldBlurred.bind(this);
        this.emailFieldFocused = this._emailFieldFocused.bind(this);
        this.disableButton = this._disableButton.bind(this);
        this.getFormValue = this._getFormValue.bind(this);
        this.submit = this._submit.bind(this);

        this.strangeForm({
            fields: ['email'],
            get: (someProps, field) => this.state[field],
            act: (field, value) => this.setState({ [field]: value }),
            getFormValue: this.getFormValue
        });
    }

    componentWillMount() {

        this.props.clearErrors();
    }

    _getFormValue(value) {

        return value;
    }

    _emailFieldBlurred() {

        this.setState({ hasEmailBlurred: true });
    }

    _emailFieldFocused() {

        this.setState({ hasEmailBlurred: false });
    }

    _showEmailError() {

        return this.state.hasEmailBlurred && (!!this.state.email && !IsEmail(this.state.email));
    }

    _disableButton() {

        const { email } = this.state;

        return !IsEmail(email);
    }

    _submit() {

        const { email } = this.state;

        // TODO Need to reset the form, so form is empty on navigating back
        this.props.requestReset({ email });
    }

    render() {

        // TODO when typing triggers an invalid email, you lose your cursor, are booted from
        // the input. Why? How can we prevent?
        return (
            <ScrollView>
                <Card>
                    <CardItem header bordered>
                        <Text>Forgot Your Password?</Text>
                    </CardItem>
                    <CardItem>
                        <Text>To reset your password, enter your email below and we will email a code to reset your password.</Text>
                    </CardItem>
                    <Form>
                        <Item rounded success={!this.showEmailError() && this.state.hasEmailBlurred} error={this.showEmailError()}>
                            <InputIcon name='mail' />
                            <Input
                                hasError={this.showEmailError()}
                                onChangeText={this.proposeNew('email')}
                                onBlur={this.emailFieldBlurred}
                                onFocus={this.emailFieldFocused}
                                value={this.fieldValue('email')}
                                placeholder='Email Address'
                                icon='envelope'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                        </Item>
                        {this.showEmailError() &&
                            <ErrorText>Please enter a valid email address</ErrorText>
                        }
                        {this.props.errorMessage &&
                            <ErrorText>{this.props.errorMessage}</ErrorText>
                        }
                        <Button
                            onPress={this.submit}
                            text='REQUEST RESET CODE'
                            icon='sync'
                            disabled={this.disableButton()}
                            block
                            rounded
                        />
                    </Form>
                </Card>
            </ScrollView>
        );
    }
};
