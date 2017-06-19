import React from 'react';
import {VIEW_ARTICLE} from '../model/actions'
import { SideNav, Link as SideNavLink } from '@cjdev/visual-stack/lib/components/SideNav';
import {ActionLink} from 'routedux';

export default function MenuSidebar({items}) {
  return (
    <SideNav>
      {items.map((item) => {
        return (
          <ActionLink key={item.id} action={{type: VIEW_ARTICLE, id: item.id}}>
            {item.title}
          </ActionLink>
        );
      })}
    </SideNav>
  );
};
