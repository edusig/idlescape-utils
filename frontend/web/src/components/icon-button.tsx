import styled from 'styled-components';

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: transparent;
  border-radius: 50%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  color: ${props => props.theme.palette.text.secondary};
  transition: background 300ms;
  border: none;
  outline: none;
  cursor: pointer;
`;
