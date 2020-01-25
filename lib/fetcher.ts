import fetch from 'isomorphic-unfetch';

const defaultHeaders = {
    'Content-Type': 'application/json',
};

const fetcher = <T>(url: string, data?: RequestInit): Promise<T> => {
    const BASE_URL = 'http://localhost:8080';
    const fullUrl = `${url.startsWith('/') ? BASE_URL : ''}${url}`;
    console.log(fullUrl);
    return fetch(fullUrl, { ...data, headers: { ...defaultHeaders, ...data?.headers } }).then(r => r.json());
};

export default fetcher;
