import * as React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StoreIcon from '@material-ui/icons/Store';
import HomeIcon from '@material-ui/icons/Home';

interface AdminDrawerProps {
  open: boolean;
  onClose: () => any;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <Box display="flex" flexDirection="column" py={2} width="300px" height="100%">
        <Box flexGrow={1} pb={4}>
          <List disablePadding>
            <Link href="/">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link href="market-prices">
              <ListItem button>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Market Prices" />
              </ListItem>
            </Link>
            <Link href="/calculators">
              <ListItem button>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Calculators" />
              </ListItem>
            </Link>
          </List>
        </Box>
        <Box px={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Developed with <span style={{ color: 'red' }}>♥</span> by{' '}
            <a href="https://github/edusig" target="_blank">
              Eduardo S. Ciciliato
            </a>
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};
