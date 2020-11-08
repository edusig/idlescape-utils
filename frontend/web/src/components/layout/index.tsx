import * as React from 'react';
import styled from 'styled-components';
import { SEO } from '@app/components/seo';
import { IndexDrawer } from './index-drawer';
import { IndexToolbar } from './index-toolbar';
import { IndexSidebar } from './index-sidebar';
import Head from 'next/head';

const AdminMain = styled.main`
  padding-top: 4rem;
  padding-bottom: 2rem;
  ${props => props.theme.breakpoints.up('md')} {
    margin-left: 200px;
  }
`;

const AdminContainer = styled.div`
  box-sizing: content-box;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
  ${props => props.theme.breakpoints.up('md')} {
    max-width: 1160px;
  }
`;

const AdminContent = styled.div`
  max-width: 960px;
  overflow: hidden;
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
      <Head>
        {' '}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SEO title={title} />
      <header>
        <IndexToolbar OnOpenDrawer={menuHandler} />
      </header>
      <IndexDrawer
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
        }}
      />
      <IndexSidebar />
      <AdminMain>
        <AdminContainer>
          <AdminContent>{props.children}</AdminContent>
        </AdminContainer>
      </AdminMain>
    </div>
  );
};

export default IndexLayout;
