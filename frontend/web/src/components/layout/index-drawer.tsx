import * as React from 'react';
import Link from 'next/link';
import { FaCalculator, FaStore, FaHome } from 'react-icons/fa';
import styled from 'styled-components';
import { transitions } from 'polished';
import Typography from '../typography';

const Drawer = styled.div.attrs((attrs: any) => ({
  $open: attrs.$open,
}))`
  position: fixed;
  z-index: ${props => props.theme.zIndex.drawer};
  left: 0;
  top: 0;
  bottom: 0;
  background-color: ${props => props.theme.palette.background};
  transform: ${props => (props.$open ? 'translateX(0)' : 'translateX(-100%)')};
  ${transitions(['transform', '0.2s ease-in-out'])};
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const DrawerOverlay = styled.div.attrs((attrs: any) => ({
  $open: attrs.$open,
}))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => (props.$open ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)')};
  pointer-events: ${props => (props.$open ? 'all' : 'none')};
  z-index: ${props => props.theme.zIndex.drawerOverlay};
  ${transitions(['background-color'], '0.3s linear')};
`;

const DrawerContent = styled.div`
  flex-grow: 1;
  padding-bottom: 2rem;
`;

const DrawerFooter = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;
`;

const Menu = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const MenuItem = styled.li`
  cursor: pointer;
  display: flex;
  padding: 1rem 0.5rem;
  &:hover {
    background-color: #eee;
  }
`;

const MenuItemIcon = styled.div`
  margin: 0 1rem;
`;

const DrawerTitle = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
`;

interface AdminDrawerProps {
  open: boolean;
  onClose: () => any;
}

export const IndexDrawer: React.FC<AdminDrawerProps> = ({ open, onClose }) => {
  return (
    <div>
      <Drawer $open={open}>
        <DrawerContent>
          <DrawerTitle>Idlescape Utils</DrawerTitle>
          <Menu>
            <Link href="/">
              <MenuItem>
                <MenuItemIcon>
                  <FaHome />
                </MenuItemIcon>
                Home
              </MenuItem>
            </Link>
            <Link href="market-prices">
              <MenuItem>
                <MenuItemIcon>
                  <FaStore />
                </MenuItemIcon>
                Market Prices
              </MenuItem>
            </Link>
            <Link href="/calculators">
              <MenuItem>
                <MenuItemIcon>
                  <FaCalculator />
                </MenuItemIcon>
                Calculators
              </MenuItem>
            </Link>
          </Menu>
        </DrawerContent>
        <DrawerFooter>
          <Typography $variant="subtitle2">
            Developed by{' '}
            <a href="https://github/edusig" target="_blank">
              Eduardo Ciciliato
            </a>
          </Typography>
        </DrawerFooter>
      </Drawer>
      <DrawerOverlay onClick={onClose} $open={open} />
    </div>
  );
};
