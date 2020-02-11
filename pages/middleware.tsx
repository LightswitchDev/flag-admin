import * as React from 'react';
import { Navigation, WithLeftPaneNavigation, RightPaneAnchor } from '../components/Navigation';
import { NextPage, NextPageContext } from 'next';
import { ProviderSnippet } from '../components/snippets/ProviderSnippet';
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

    return (<Navigation title="Middleware">
        <WithLeftPaneNavigation>
            <RightPaneAnchor anchor="react" title="React" />
            <ProviderSnippet></ProviderSnippet>

            <RightPaneAnchor anchor="redux" title="React / Redux" />
            <RightPaneAnchor anchor="redux" title="React / Redux / Sagas" />
            <RightPaneAnchor anchor="redux" title="Node / Express Middleware" />
        </WithLeftPaneNavigation>
    </Navigation>);
};

GetStartedPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
    const organizationId = await getOrganizationId(ctx);

    return { organizationId };
};


export default GetStartedPage;
