import * as React from 'react';
import styled from 'styled-components';
import { SEO } from '@app/components/seo';
import { AdminDrawer } from './index-drawer';
import { AdminToolbar } from './index-toolbar';
import { AdminSidebar } from './index-sidebar';

const AdminMain = styled.main`
  padding-top: 4rem;
  padding-bottom: 2rem;
  ${props => props.theme.breakpoints.up('md')} {
    margin-left: 240px;
  }
`;

const AdminContainer = styled.div`
  box-sizing: content-box;
  max-width: 690px;
  margin: 0 auto;
  padding: 0 1rem;
  ${props => props.theme.breakpoints.up('md')} {
    max-width: 1200px;
  }
`;

const AdminContent = styled.div`
  max-width: 960px;
`;

interface OwnProps {
  title: string;
}

export const IndexLayout: React.FunctionComponent<OwnProps> = props => {
  const { title } = props;
  const menuHandler = () => {
    setMenuOpen(true);
  };
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div>
      <SEO title={title} />
      <header>
        <AdminToolbar OnOpenDrawer={menuHandler} />
      </header>
      <AdminDrawer
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
        }}
      />
      <AdminSidebar />
      <AdminMain>
        <AdminContainer>
          <AdminContent>{props.children}</AdminContent>
        </AdminContainer>
      </AdminMain>
    </div>
  );
};

export default IndexLayout;
