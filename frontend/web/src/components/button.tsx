import { lighten } from 'polished';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const ButtonContent = styled.span`
  width: 100%; // Ensure the correct width for iOS Safari
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  text-transform: uppercase;
`;

const ButtonContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: thin solid ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.main};
  border-radius: 0.25rem;
  &:hover {
    background-color: ${props => lighten(0.65, props.theme.palette.primary.main)};
  }
  transition: background 300ms;
  cursor: pointer;
  outline: none;
`;

const ButtonIcon = styled.span`
  font-size: 20px;
  display: inherit;
`;

const ButtonStartIcon = styled(ButtonIcon)`
  margin-right: 0.5rem;
  margin-left: -0.25rem;
`;

const ButtonEndIcon = styled(ButtonIcon)`
  margin-left: 0.5rem;
  margin-right: -0.25rem;
`;

export interface ButtonProps {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  type?: string;
}

export const Button: FC<ButtonProps> = ({ children, startIcon, endIcon, ...rest }) => {
  return (
    <ButtonContainer {...(rest as any)}>
      <ButtonContent>
        {startIcon && <ButtonStartIcon>{startIcon}</ButtonStartIcon>}
        {children}
        {endIcon && <ButtonEndIcon>{endIcon}</ButtonEndIcon>}
      </ButtonContent>
    </ButtonContainer>
  );
};
