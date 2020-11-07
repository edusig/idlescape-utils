import * as React from 'react';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import {
  Slide,
  SnackbarContent,
  Snackbar as MUISnackbar,
  Box,
  SnackbarOrigin,
} from '@material-ui/core';
import styled from 'styled-components';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';

const SlideTransition = (props: TransitionProps) => {
  return <Slide {...props} direction="up" />;
};

interface OwnProps {
  open: boolean;
  autoHideDuration?: number;
  message: string | React.ReactNode;
  type?: 'default' | 'success' | 'information' | 'danger';
  onClose: () => void;
}

const SnackbarContainer = styled.div.attrs((attrs: any) => ({
  contentType: attrs.contentType || 'default',
}))`
  .MuiSnackbarContent-root {
    background-color: ${props =>
      props.contentType === 'success'
        ? '#4caf50'
        : props.contentType === 'information'
        ? '#12b9b0'
        : props.contentType === 'danger'
        ? '#ff4444'
        : 'rgb(49, 49, 49)'} !important;
  }
`;

const snackIcon = {
  default: undefined,
  success: <DoneIcon />,
  information: undefined,
  danger: <ErrorIcon />,
};

const anchor: SnackbarOrigin = { vertical: 'bottom', horizontal: 'center' };

export const Snackbar: React.FC<OwnProps> = ({
  open,
  autoHideDuration = 5000,
  message,
  type = 'default',
  onClose,
}) => (
  <SnackbarContainer contentType={type}>
    <MUISnackbar
      anchorOrigin={anchor}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      TransitionComponent={SlideTransition}
    >
      <SnackbarContent
        message={
          typeof message === 'string' ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box mr={1}>{snackIcon[type]}</Box>
              {message}
            </Box>
          ) : (
            message
          )
        }
      />
    </MUISnackbar>
  </SnackbarContainer>
);
