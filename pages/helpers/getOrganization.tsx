import { NextPageContext } from 'next';
import { parseCookies, setCookie } from 'nookies';
import * as React from 'react';
import { createOrganization } from '../../data/organizations';

const getOrganizationId = async (ctx: NextPageContext): Promise<string> => {
  const cookies = parseCookies(ctx);
  let organizationId: string = cookies['lightswitch'];
  if (!organizationId) {
      const { organization } = await createOrganization({ shouldMutate: true });
      organizationId = organization.id;

      if (organizationId) {
          setCookie(ctx, 'lightswitch', organizationId, { maxAge: 60 * 60 * 24 * 30 * 1000 });
      }
  }

  return organizationId;
};

export { getOrganizationId };