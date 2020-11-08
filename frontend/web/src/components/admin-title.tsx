import * as React from 'react';
import styled from 'styled-components';
import Typography from './typography';

const AdminTitleContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
`;

export interface AdminTitleProps {
  title: string;
  subtitle?: string;
  backLink?: string;
  backLabel?: string;
}

export const AdminTitle: React.FC<AdminTitleProps> = ({ title, subtitle }) => {
  return (
    <AdminTitleContainer>
      <Typography variant="h3" textComponent="h1">
        {title}
      </Typography>
      {subtitle != null && (
        <Typography variant="body1" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </AdminTitleContainer>
  );
};
