const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');
const { CardItem } = require('native-base');
const { Button, Input, ScrollView, ErrorText, Text, Card, Form, Item, InputIcon } = require('styles');

module.exports = class ResetPassword extends StrangeForms(React.PureComponent) {

    static propTypes = {
        resetPassword: T.func.isRequired,
        errorMessage: T.string,
        clearErrors: T.func.isRequired
    };

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            resetToken: '',
            password: '',
            confirmPassword: '',
            isBlurred: {
                email: false,
                confirmPassword: false
            }
        };

        this.showEmailError = this._showEmailError.bind(this);
        this.toggleFieldBlur = this._toggleFieldBlur.bind(this);
        this.showEmailError = this._showEmailError.bind(this);
        this.showPasswordError = this._showPasswordError.bind(this);
        this.passwordsMatch = this._passwordsMatch.bind(this);
        this.disableButton = this._disableButton.bind(this);
        this.getFormValue = this._getFormValue.bind(this);
        this.submit = this._submit.bind(this);

        this.strangeForm({
            fields: ['email', 'resetToken', 'password', 'confirmPassword'],
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

    _toggleFieldBlur(field, bool) {

        const isBlurred = { ...this.state.isBlurred };
        isBlurred[field] = bool;
        this.setState(Object.assign({}, this.state, { isBlurred }));
    }

    _showEmailError() {

        return this.state.email.length > 0 && this.state.isBlurred.email && (!!this.state.email && !IsEmail(this.state.email));
    }

    _showPasswordError() {

        return this.state.isBlurred.confirmPassword && !this.passwordsMatch();
    }

    _passwordsMatch() {

        return this.state.password.length > 0 && this.state.password === this.state.confirmPassword;
    }

    _disableButton() {

        const { email, resetToken } = this.state;

        if (IsEmail(email) && resetToken !== '' && this.passwordsMatch()) {
            return false;
        }

        return true;
    }

    _submit() {

        const { email, resetToken, password } = this.state;

        // TODO Need to reset the form, so form is empty on navigating back?
        this.props.resetPassword(email, password, resetToken);
    }

    render() {

        // TODO when typing triggers an invalid email, you lose your cursor, are booted from
        // the input. Why? How can we prevent?
        return (
            <ScrollView>
                <Card>
                    <CardItem header bordered>
                        <Text>Reset Password</Text>
                    </CardItem>
                    <CardItem>
                        <Text>Please confirm your email address, enter the reset code you received via email, and set your new password below.</Text>
                    </CardItem>
                    <Form>
                        <Item rounded success={!this.showEmailError() && this.state.isBlurred.email} error={this.showEmailError()}>
                            <InputIcon name='mail' />
                            <Input
                                onChangeText={this.proposeNew('email')}
                                onBlur={() => this.toggleFieldBlur('email', true)}
                                onFocus={() => this.toggleFieldBlur('email', false)}
                                value={this.fieldValue('email')}
                                placeholder='Email Address'
                                keyboardType='email-address'
                                autoCorrect={false}
                                autoCapitalize='none'
                            />
                        </Item>
                        {this.showEmailError() &&
                        <ErrorText>Please enter a valid email address</ErrorText>
                        }
                        <Item rounded>
                            <InputIcon name='sync' />
                            <Input
                                onChangeText={this.proposeNew('resetToken')}
                                value={this.fieldValue('resetToken')}
                                placeholder='Password Reset Code'
                                keyboardType='number-pad'
                                autoCorrect={false}
                            />
                        </Item>
                        <Item rounded success={!this.showPasswordError() && this.state.isBlurred.confirmPassword} error={this.showPasswordError()}>
                            <InputIcon name='lock' />
                            <Input
                                onChangeText={this.proposeNew('password')}
                                value={this.fieldValue('password')}
                                placeholder='Password'
                                secureTextEntry
                            />
                        </Item>
                        <Item rounded success={!this.showPasswordError() && this.state.isBlurred.confirmPassword} error={this.showPasswordError()}>
                            <InputIcon name='lock' />
                            <Input
                                onBlur={() => this.toggleFieldBlur('confirmPassword', true)}
                                onFocus={() => this.toggleFieldBlur('confirmPassword', false)}
                                onChangeText={this.proposeNew('confirmPassword')}
                                value={this.fieldValue('confirmPassword')}
                                placeholder='Confirm Password'
                                secureTextEntry
                            />
                        </Item>
                        {this.showPasswordError() &&
                            <ErrorText>Please enter matching passwords</ErrorText>
                        }
                        <Button
                            onPress={this.submit}
                            text='RESET PASSWORD'
                            icon='sync'
                            disabled={this.disableButton()}
                            block
                            rounded
                        />
                    </Form>
                    {this.props.errorMessage &&
                        <ErrorText>{this.props.errorMessage}</ErrorText>
                    }
                </Card>
            </ScrollView>
        );
    }
};
