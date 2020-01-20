import { gql } from 'apollo-boost';

export type Organization = {
    id: string;
    name?: string;
};

export const CREATE_ORGANIZATION = gql`
    mutation createOrganization($organization: OrganizationCreateInput!) {
        createOneOrganization(data: $organization) {
            id
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
