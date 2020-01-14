import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { useQuery } from '@apollo/react-hooks'
import { GET_SWITCHES_BY_ORG, SwitchFromOrg } from '../gql/switches'
import LightSwitch from '../components/Switch'

const IndexPage: NextPage = () => {
    const id = "ck5dcn0980000ixw1e9fjiqfh";
    const { data, loading, error } = useQuery<{ switches: SwitchFromOrg[] }>(GET_SWITCHES_BY_ORG, { variables: { id } });

    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <p>Not found</p>;
    const { switches } = data;
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            <React.Fragment>
                {
                    switches.map(lightswitch => <LightSwitch lightswitch={lightswitch}></LightSwitch>)
                }
            </React.Fragment>
        </Layout >
    )
}

export default IndexPage