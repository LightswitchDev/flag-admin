import fetcher from '../lib/fetcher';
import { Options, ORG_URL_KEY, getOrgKey, Organization } from './organizations';
import { mutate } from 'swr';

export type Variant = {
    id: string;
    value: string;
};

export type SwitchFromOrg = {
    id?: string;
    name: string;
    key: string;
    createdAt?: string;
    updatedAt?: string;
    type: string;
    enabled: boolean;
};

export const createUpdateSwitch = async (organizationId: string, lightswitch: SwitchFromOrg, options?: Options) => {
    const data = await fetcher<{ organization: Organization }>(getOrgKey(organizationId), {
        method: 'PUT',
        body: {
            lightswitch,
        },
    });
    if (options?.shouldMutate) {
        mutate(getOrgKey(data.organization.id), data.organization, options?.shouldRevalidate);
    }
};
