import fetch from 'isomorphic-unfetch';

const defaultHeaders = {
    'Content-Type': 'application/json',
};

import firebase from 'firebase/app';

interface RequestInitWithBody extends RequestInit {
    body?: any;
}

const fetcher = async <T>(url: string, data?: RequestInitWithBody): Promise<T> => {
    // const BASE_URL =
    //     process.env.NODE_ENV === 'production' ? 'https://flag-api-vykaoik56q-uc.a.run.app' : 'http://localhost:8080';
    const BASE_URL = 'https://flag-api-vykaoik56q-uc.a.run.app';

    //TODO: do we need to set a cookie instead of local storage to make SSR calls work?
    //right now we just fetch an anonymous org, but in the future this might be different
    const idToken = await (typeof window !== 'undefined' || !firebase.apps.length
        ? ''
        : firebase.auth().currentUser?.getIdToken());
    const fullUrl = `${url.startsWith('/') ? BASE_URL : ''}${url}`;
    return fetch(fullUrl, {
        ...data,
        headers: { ...defaultHeaders, Authorization: `Bearer ${idToken}`, ...data?.headers },
        body: data?.body ? JSON.stringify(data.body) : undefined,
    }).then(r => r.json());
};

export default fetcher;
