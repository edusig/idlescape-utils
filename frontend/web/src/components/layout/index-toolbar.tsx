import * as React from 'react';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

const AppBar = styled.div`
  background: linear-gradient(135deg, rgba(0, 91, 168, 1) 0%, rgba(0, 151, 246, 1) 100%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 10px 0px rgb(0 0 0 / 12%);
  padding: 0 1rem;
  height: 4rem;
  color: white;
  display: flex;
  align-items: center;
  z-index: ${props => props.theme.zIndex.appbar};
`;

const MenuButton = styled.button`
  padding: 0.5rem;
  margin-right: 1rem;
  background: transparent;
  border: none;
  color: inherit;
  display: none;
  ${props => props.theme.breakpoints.down('md')} {
    display: block;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: normal;
  margin: 0;
`;

interface AdminToolbarProps {
  OnOpenDrawer: () => any;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({ OnOpenDrawer }) => {
  return (
    <AppBar>
      <MenuButton onClick={OnOpenDrawer} color="inherit">
        <FaBars />
      </MenuButton>
      <Title>Idlescape Utils</Title>
    </AppBar>
  );
};
