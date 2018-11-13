const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');
const { CardItem } = require('native-base');
const { ScrollView, Button, Input, InputIcon, Card, Form, Item, ErrorText, Text } = require('styles');

module.exports = class Login extends StrangeForms(React.PureComponent) {

    static propTypes = {
        login: T.func.isRequired,
        errorMessage: T.string,
        authError: T.string,
        clearErrors: T.func.isRequired
    };

    constructor(props, context) {

        super(props, context);

        this.state = {
            email: '',
            password: '',
            hasEmailBlurred: false
        };

        this.submit = this._submit.bind(this);
        this.getFormValue = this._getFormValue.bind(this);
        this.emailFieldBlurred = this._emailFieldBlurred.bind(this);
        this.showEmailError = this._showEmailError.bind(this);

        this.strangeForm({
            fields: ['email', 'password'],
            get: (someProps, field) => this.state[field],
            act: (field, value) => this.setState({ [field]: value }),
            getFormValue: this.getFormValue
        });
    }

    componentDidMount() {

        this.props.clearErrors();
    }

    inputsAreValid() {

        return this.state.email !== '' && this.state.password !== '' && !this.showEmailError();
    }

    _getFormValue(value) {

        return value;
    }

    _submit() {

        const { email, password } = this.state;

        this.props.login({ email, password });
    }

    _emailFieldBlurred() {

        this.setState({ hasEmailBlurred: true });
    }

    _showEmailError() {

        return this.state.hasEmailBlurred && !IsEmail(this.state.email);
    }

    render() {

        const { navigation, isAuthenticated } = this.props;

        return (

            <ScrollView>
                <Card>
                    <CardItem header bordered>
                        <Text>User Login</Text>
                    </CardItem>
                    <Form>
                        <Item rounded success={!this.showEmailError() && this.state.hasEmailBlurred} error={this.showEmailError() || (this.props.authError && true)}>
                            <InputIcon name='mail' />
                            <Input
                                onChangeText={this.proposeNew('email')}
                                onBlur={this.emailFieldBlurred}
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
                        <Item rounded success={this.state.password.length > 1} error={this.props.authError && true}>
                            <InputIcon name='lock' />
                            <Input
                                onChangeText={this.proposeNew('password')}
                                value={this.fieldValue('password')}
                                placeholder='Password'
                                secureTextEntry
                            />
                        </Item>
                    </Form>
                    {this.props.authError &&
                    <CardItem>
                        <ErrorText>{this.props.authError}</ErrorText>
                    </CardItem>
                    }
                    {this.inputsAreValid() &&
                        <Button
                            block
                            rounded
                            onPress={this.submit}
                            text='LOGIN'
                            icon='md-log-in'
                            iconLeft
                        />
                    }
                </Card>
                {!isAuthenticated &&
                    <Text onPress={() => navigation.navigate('ForgotPassword')}>
                        Forgot Your Password?
                    </Text>
                }
                {!isAuthenticated &&
                    <Text onPress={() => navigation.navigate('ResetPassword')}>
                        Reset Your Password
                    </Text>
                }
            </ScrollView>
        );
    }
};
