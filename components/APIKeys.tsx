import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Organization, GET_ORGANIZATION } from '../gql/organizations';

type Props = {
    organizationId: string;
};

const APIKeysList: React.FunctionComponent<Props> = ({ organizationId }) => {
    const { data, loading, error } = useQuery<{ organization: Organization }>(GET_ORGANIZATION, {
        variables: { id: organizationId },
    });
    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <p>Not found</p>;
    const {
        organization: { name, keys, id },
    } = data;
    return (
        <div>
            <div>{name}</div>
            <div>{id}</div>
            {keys.map(key => (
                <div>
                    {key.id}, {key.createdAt}
                </div>
            ))}{' '}
        </div>
    );
};

export default APIKeysList;
