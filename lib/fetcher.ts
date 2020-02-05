import fetch from 'isomorphic-unfetch';

const defaultHeaders = {
    'Content-Type': 'application/json',
};

interface RequestInitWithBody extends RequestInit {
    body?: any;
}

const fetcher = <T>(url: string, data?: RequestInitWithBody): Promise<T> => {
    // const BASE_URL =
    //     process.env.NODE_ENV === 'production' ? 'https://flag-api-vykaoik56q-uc.a.run.app' : 'http://localhost:8080';
    const BASE_URL = 'https://flag-api-vykaoik56q-uc.a.run.app';

    const fullUrl = `${url.startsWith('/') ? BASE_URL : ''}${url}`;
    console.log(fullUrl);
    return fetch(fullUrl, {
        ...data,
        headers: { ...defaultHeaders, ...data?.headers },
        body: data?.body ? JSON.stringify(data.body) : undefined,
    }).then(r => r.json());
};

export default fetcher;
