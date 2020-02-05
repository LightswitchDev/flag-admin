import React, { useState, useContext, createContext } from 'react';
import queryString from 'query-string';
import firebase, { initializeApp } from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyD9OoGXpvvsaKGIWceTrbOMKSLOtYu1ViY',
    authDomain: 'pristine-flames-265923.firebaseapp.com',
    projectId: 'pristine-flames-265923',
    storageBucket: 'pristine-flames-265923.appspot.com',
    messagingSenderId: '734616149062',
    appId: '1:734616149062:web:cea02e49ff541df66c3e47',
    databaseURL: 'https://pristine-flames-265923.firebaseio.com',
    measurementId: 'G-05BVGTD494',
};

const authContext = createContext<UserState | null>(null);

export const ProvideAuth: React.FC = ({ children }) => {
    const auth = useProvideAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

type UserOrNullPromise = Promise<firebase.User | null>;
type UserState = {
    user: firebase.User | null;
    signup: (email: string, password: string) => UserOrNullPromise;
    signin: (email: string, password: string) => UserOrNullPromise;
    signout: () => Promise<void>;
    sendPasswordResetEmail: (email: string) => Promise<void>;
    confirmPasswordReset: (password: string, code: string) => Promise<void>;
    getIdToken: () => Promise<string | undefined> | undefined;
    signinWithGithub: () => UserOrNullPromise;
};
// Provider hook that creates auth object and handles state
function useProvideAuth(): UserState {
    const [user, setUser] = useState<firebase.User | null>(null);
    React.useEffect(() => {
        console.log('use effect');
        if (!firebase.apps.length) {
            initializeApp(firebaseConfig);
            console.log('init');
            const unsubscribe = firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
            });

            // Subscription unsubscribe function
            return () => unsubscribe();
        }
    });
    const signin = (email: string, password: string) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                return response.user;
            });
    };

    const signinWithGithub = () => {
        const provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('user');
        console.log('login', firebase.auth());
        return firebase
            .auth()
            .signInWithPopup(provider)
            .then(res => {
                setUser(res.user);
                return res.user;
            });
    };
    const signup = (email: string, password: string) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                return response.user;
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null);
            });
    };

    const sendPasswordResetEmail = (email: string) => {
        return firebase.auth().sendPasswordResetEmail(email);
    };

    const confirmPasswordReset = (password: string, code: string) => {
        // Get code from query string object
        const resetCode = code || (getFromQueryString('oobCode') as string);
        return firebase.auth().confirmPasswordReset(resetCode, password);
    };

    const getIdToken = () => {
        if (firebase.auth().currentUser) {
            return firebase.auth().currentUser?.getIdToken();
        } else {
            return firebase
                .auth()
                .signInAnonymously()
                .then(x => x && x.user?.getIdToken());
        }
    };

    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
        getIdToken,
        signinWithGithub,
    };
}

const getFromQueryString = (key: string) => {
    return queryString.parse(window.location.search)[key];
};
