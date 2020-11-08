import * as React from 'react';
import { IndexLayout } from '@app/components/layout';
import { AdminTitle } from '@app/components/admin-title';

const Home: React.FC = () => {
  return (
    <IndexLayout title="Home">
      <AdminTitle title="Idlescape Utils" subtitle="The best tool to calculate realtime results!" />
    </IndexLayout>
  );
};

export default Home;
