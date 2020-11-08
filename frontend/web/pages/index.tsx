import * as React from 'react';
import { initializeApollo } from '../apollo/client';
import { GetServerSideProps } from 'next';
import { IndexLayout } from '@app/components/layout';
import { AdminTitle } from '@app/components/admin-title';

const Home: React.FC = () => {
  return (
    <IndexLayout title="Home">
      <AdminTitle title="Idlescape Utils" subtitle="The best tool to calculate realtime results!" />
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
