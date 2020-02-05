import {
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
} from '@chakra-ui/core';
import { Formik, Form, Field } from 'formik';
import { useAuth } from '../lib/auth';
import { GithubLoginButton } from 'react-social-login-buttons';

import * as Yup from 'yup';
import { FieldChildrenProps } from './SwitchDrawer';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string().required(),
});
type Props = {
    isOpen: boolean;
    isLogin: boolean;
    onClose: () => void;
};

const AuthModal: React.FC<Props> = ({ isLogin, isOpen, onClose }) => {
    const auth = useAuth();
    const user = auth?.user;
    if (user) {
        console.log(user);
    }
    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{isLogin ? 'Welcome Back!' : 'Create Your Account'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={async values => {
                                try {
                                    const user = await (isLogin
                                        ? auth?.signin(values.email, values.password)
                                        : auth?.signup(values.email, values.password));
                                    onClose();
                                } catch (e) {
                                    //TODO: handle error signup
                                    console.log('failed to create new user');
                                    console.error(e);
                                }
                            }}
                        >
                            {({ errors, touched, isSubmitting }) => (
                                <Form autoComplete={isLogin ? 'off' : 'on'}>
                                    <Field name="email">
                                        {({ field }: FieldChildrenProps) => (
                                            <Input
                                                autoFocus={true}
                                                type="email"
                                                marginBottom="4px"
                                                placeholder="Email Address"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field }: FieldChildrenProps) => (
                                            <Input
                                                type="password"
                                                autoComplete={isLogin ? 'on' : 'new-password'}
                                                marginBottom="4px"
                                                placeholder="Password"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                    <Button w="100%" type="submit" isLoading={isSubmitting}>
                                        {isLogin ? 'Log In' : 'Get Started'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Text textAlign="center">or</Text>
                        <GithubLoginButton
                            onClick={() => {
                                const user = auth?.signinWithGithub();
                                onClose();
                            }}
                        >
                            {isLogin ? 'Log In' : 'Sign Up'} With Github
                        </GithubLoginButton>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AuthModal;
