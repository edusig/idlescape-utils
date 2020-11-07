import * as React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';

const CustomAppBar = styled(AppBar)`
  background: linear-gradient(135deg, rgba(0, 91, 168, 1) 0%, rgba(0, 151, 246, 1) 100%);
`;

const MenuButton = styled(IconButton)`
  margin-right: ${props => props.theme.spacing(2)}px;
`;

const TopNavToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const TopNavSection = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

interface AdminToolbarProps {
  OnOpenDrawer: () => any;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({ OnOpenDrawer }) => {
  return (
    <CustomAppBar position="fixed" color="primary">
      <TopNavToolbar>
        <TopNavSection>
          <MenuButton onClick={OnOpenDrawer} color="inherit">
            <MenuIcon />
          </MenuButton>
          <Typography variant="h5" component="h1">
            Idlescape Utils
          </Typography>
        </TopNavSection>
      </TopNavToolbar>
    </CustomAppBar>
  );
};
