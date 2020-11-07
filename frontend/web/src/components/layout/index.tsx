import * as React from 'react';
import styled from 'styled-components';
import { SEO } from '@app/components/seo';
import { AdminDrawer } from './index-drawer';
import { AdminToolbar } from './index-toolbar';

const AdminMain = styled.main`
  padding-top: ${props => props.theme.spacing(8)}px;
  padding-bottom: ${props => props.theme.spacing(4)}px;
  ${props => props.theme.breakpoints.up('md')} {
    margin-left: 240px;
  }
`;

const AdminContainer = styled.div`
  box-sizing: content-box;
  max-width: 690px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing(0, 2)};
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
      <AdminMain>
        <AdminContainer>
          <AdminContent>{props.children}</AdminContent>
        </AdminContainer>
      </AdminMain>
    </div>
  );
};

export default IndexLayout;
