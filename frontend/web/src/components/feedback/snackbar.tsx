import * as React from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { transitions } from 'polished';

interface OwnProps {
  open: boolean;
  autoHideDuration?: number;
  message: string | React.ReactNode;
  type?: 'default' | 'success' | 'information' | 'danger';
  onClose: () => void;
}

const statusColor: any = {
  success: '#4caf50',
  information: '#12b9b0',
  danger: '#ff4444',
};

const getColor = (key: string) =>
  statusColor.hasOwnProperty(key) ? statusColor[key] : 'rgb(49, 49, 49)';

const SnackbarContainer = styled.div.attrs((attrs: any) => ({
  $contentType: attrs.$contentType || 'default',
  $open: attrs.$open,
}))`
  background-color: ${props => getColor(props.$contentType)};
  position: fixed;
  bottom: 0;
  transform: ${props => (props.$open ? 'translateY(1rem)' : 'translateY(-100%)')};
  transition: ${transitions(['transform'], '0.5s ease-in')};
`;

const SnackBarText = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SnackBarIcon = styled.div`
  margin-right: 0.5rem;
`;

const snackIcon = {
  default: undefined,
  success: <FaCheck />,
  information: undefined,
  danger: <FaTimes />,
};

export const Snackbar: React.FC<OwnProps> = ({
  open,
  autoHideDuration = 5000,
  message,
  type = 'default',
  onClose,
}) => {
  const [timer, setTimer] = React.useState<number | undefined>();
  React.useEffect(() => {
    if (open) {
      setTimer(setTimeout(onClose, autoHideDuration));
    } else {
      if (timer != null) {
        clearTimeout(timer);
        setTimer(undefined);
      }
    }
  }, [open]);
  return (
    <SnackbarContainer $contentType={type} $open={open}>
      {typeof message === 'string' ? (
        <SnackBarText>
          <SnackBarIcon>{snackIcon[type]}</SnackBarIcon>
          {message}
        </SnackBarText>
      ) : (
        message
      )}
    </SnackbarContainer>
  );
};
