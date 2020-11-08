import styled from 'styled-components';

export const Row = styled.tr`
  &:nth-child(2n) {
    background-color: #007fd726;
  }
`;

export const ResponsiveTable = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  ${props => props.theme.breakpoints.down('sm')} {
    min-width: 690px;
  }
`;

export const Cell = styled.td`
  padding: 0.5rem 0.5rem;
  border-bottom: thin solid #007fd736;
`;

export const CustomCell = styled(Cell)`
  display: flex;
  align-items: center;
`;
