import { gql } from 'apollo-boost';

gql`
    query {
        switches(where: { organization: { name: { equals: "Test Company1" } } }) {
            type
            name
            createdAt
            updatedAt
        }
    }
`;

gql`
    query {
        mutation {
            createOneOrganization(data: { name: "test" }) {
                id
            }
        }
    }
`;

gql`
    query {
        switches(where: { organization: { id: { equals: "ck5c1grxg0000r7w1ohs66t4q" } } }) {
            type
            id
            name
            createdAt
            updatedAt
        }
    }
`;

export type Variant = {
    id: string;
    value: string;
};

export type SwitchFromOrg = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    enabled: true;
    variants: Variant[];
};

export const TOGGLE_SWITCH = gql`
    mutation enableSwitch($id: String, $enabled: Boolean) {
        updateOneSwitch(data: { enabled: $enabled }, where: { id: $id }) {
            type
            enabled
            name
            variants {
                id
                value
            }
            id
            name
            createdAt
            updatedAt
        }
    }
`;

export const GET_SWITCHES_BY_ORG = gql`
    query SwitchByOrg($id: String) {
        switches(where: { organization: { id: { equals: $id } } }, orderBy: { name: asc }) {
            type
            enabled
            name
            variants {
                id
                value
            }
            id
            name
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_SWITCH = gql`
    mutation createSwitch($switch: SwitchCreateInput!) {
        createOneSwitch(data: $switch) {
            type
            enabled
            name
            variants {
                id
                value
            }
            id
            name
            createdAt
            updatedAt
        }
    }
`;
