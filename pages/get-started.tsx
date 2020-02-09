import * as React from 'react';
import { Navigation, WithLeftPaneNavigation, RightPaneAnchor } from '../components/Navigation';
import { NextPage, NextPageContext } from 'next';
import APIKeysList from '../components/snippets/APIKeys';
import { ProviderSnippet } from '../components/CodeSnippets';
import useSWR from 'swr';
import { Organization, ORG_URL_KEY } from '../data/organizations';
import { getOrganizationId } from './helpers/getOrganization';

type Props = {
    organizationId: string;
};

const GetStartedPage: NextPage<Props> = ({ organizationId }) => {
    const { data: organization, error } = useSWR<Organization>(`${ORG_URL_KEY}/${organizationId}`, {
        refreshWhenHidden: true,
        revalidateOnFocus: false,
    });

    if (!organization) return <p>Loading</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    return (<Navigation title="Getting Started">
        <WithLeftPaneNavigation>
            <RightPaneAnchor anchor="" title="Get your Client Keys" />

            <APIKeysList organizationId={organizationId} />

            <RightPaneAnchor anchor="ReactProvider" title="Add React Provider" />
            
            <ProviderSnippet></ProviderSnippet>
        </WithLeftPaneNavigation>
    </Navigation>);
};

GetStartedPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
    const organizationId = await getOrganizationId(ctx);

    return { organizationId };
};


export default GetStartedPage;
