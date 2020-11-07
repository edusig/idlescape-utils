import * as React from 'react';
import { initializeApollo } from '../apollo/client';
import { GetServerSideProps } from 'next';
import { Box, Typography } from '@material-ui/core';
import { IndexLayout } from '@app/components/layout';

const Home: React.FC = () => {
  return (
    <IndexLayout title="Home">
      <Box mt={4}>
        <Typography variant="h3" component="h1">
          The best tool to calculate realtime results!
        </Typography>
      </Box>
    </IndexLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Home;
