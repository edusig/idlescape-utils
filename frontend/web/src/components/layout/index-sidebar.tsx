import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FaCalculator, FaStore, FaHome } from 'react-icons/fa';
import Typography from '../typography';

const FixedMenu = styled.nav`
  position: fixed;
  top: 6rem;
  left: 0;
  width: 200px;
  ${props => props.theme.breakpoints.down('md')} {
    display: none;
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const MenuItem = styled.li.attrs((attrs: any) => ({ active: attrs.active }))`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: ${props => (props.active ? '#007FD726' : 'transparent')};
  &:hover {
    background-color: ${props => (props.active ? '#007FD736' : 'rgba(0, 0, 0, 0.04)')};
  }
  border-radius: 0 2rem 2rem 0;
  &,
  svg {
    color: ${props => (props.active ? '#007FD7' : 'inherit')};
  }
`;

const MenuItemIcon = styled.div`
  margin-right: 1rem;
`;

export const IndexSidebar: React.FC = () => {
  const { asPath } = useRouter();
  return (
    <FixedMenu>
      <Menu>
        <Link href="/">
          <MenuItem active={asPath === '/'}>
            <MenuItemIcon>
              <FaHome size={20} />
            </MenuItemIcon>
            <Typography $variant="subtitle1">Home</Typography>
          </MenuItem>
        </Link>
        <Link href="/market-prices">
          <MenuItem active={asPath.startsWith('/market-prices')}>
            <MenuItemIcon>
              <FaStore size={20} />
            </MenuItemIcon>
            <Typography $variant="subtitle1">Market Prices</Typography>
          </MenuItem>
        </Link>
        <Link href="/calculators">
          <MenuItem active={asPath.startsWith('/calculators')}>
            <MenuItemIcon>
              <FaCalculator size={20} />
            </MenuItemIcon>

            <Typography $variant="subtitle1">Calculators</Typography>
          </MenuItem>
        </Link>
      </Menu>
    </FixedMenu>
  );
};
