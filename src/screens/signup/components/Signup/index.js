const React = require('react');
const T = require('prop-types');
const StrangeForms = require('strange-forms');
const IsEmail = require('utils/is-email');
const { CardItem } = require('native-base');
const { ScrollView, Button, Input,InputIcon, Item, Form, Card, Text, ErrorText } = require('styles');

module.exports = class Signup extends StrangeForms(React.PureComponent) {

    static propTypes = {
        signup: T.func.isRequired,
        errorMessage: T.string,
        authError: T.string,
        clearErrors: T.func.isRequired
    };

    constructor(props, context) {

        super(props, context);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            hasEmailBlurred: false
        };

        this.submit = this._submit.bind(this);
        this.getFormValue = this._getFormValue.bind(this);
        this.emailFieldBlurred = this._emailFieldBlurred.bind(this);

        this.strangeForm({
            fields: ['firstName', 'lastName', 'email', 'password'],
            get: (someProps, field) => this.state[field],
            act: (field, value) => this.setState({ [field]: value }),
            getFormValue: this.getFormValue
        });
    }

    componentWillMount() {

        this.props.clearErrors();
    }

    inputsAreValid() {

        return this.state.password !== ''
        && this.state.firstName !== ''
        && this.state.lastName !== ''
        && !this.showEmailError();
    }

    _getFormValue(value) {

        return value;
    }

    _submit() {

        const { email, password, firstName, lastName } = this.state;

        this.props.signup({ email, password, firstName, lastName });
    }

    _emailFieldBlurred() {

        this.setState({ hasEmailBlurred: true });
    }

    showEmailError() {

        return this.state.hasEmailBlurred && !IsEmail(this.state.email);
    }

    render() {

        return (

            <ScrollView>
                <Card>
                    <CardItem header bordered>
                        <Text>User Signup</Text>
                    </CardItem>
                    <Form>
                        <Item rounded success={this.state.firstName.length > 1} error={this.props.authError && true}>
                            <InputIcon name='person' />
                            <Input
                                onChangeText={this.proposeNew('firstName')}
                                value={this.fieldValue('firstName')}
                                placeholder='First Name'
                                autoCorrect={false}
                            />
                        </Item>
                        <Item rounded success={this.state.lastName.length > 1} error={this.props.authError && true}>
                            <InputIcon name='person' />
                            <Input
                                onChangeText={this.proposeNew('lastName')}
                                value={this.fieldValue('lastName')}
                                placeholder='Last Name'
                                autoCorrect={false}
                            />
                        </Item>
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
                            text='SIGNUP'
                            icon='md-log-in'
                            iconLeft
                        />
                    }
                </Card>
            </ScrollView>
        );
    }
};
