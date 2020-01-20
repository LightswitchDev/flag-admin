import { gql } from 'apollo-boost';

export type Key = {
    id: string;
    createdAt: string;
};

export type Organization = {
    id: string;
    name?: string;
    keys: Key[];
};

export const CREATE_ORGANIZATION = gql`
    mutation createOrganization($organization: OrganizationCreateInput!) {
        createOneOrganization(data: $organization) {
            id
            keys {
                id
                createdAt
            }
        }
    }
`;

export type CreateOneOrganizationResult = {
    createOneOrganization: Organization;
};

export const UPDATE_ORGANIZATION_NAME = gql`
    mutation updateOrganizationName($id: ID!, $name: String!) {
        updateOneOrganization(data: { name: $name }, where: { id: $id }) {
            name
            id
        }
    }
`;

export const GET_ORGANIZATION = gql`
    query getOrganization($id: ID!) {
        organization(where: { id: $id }) {
            id
            keys {
                id
                createdAt
            }
        }
    }
`;
