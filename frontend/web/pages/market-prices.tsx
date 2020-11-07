import * as React from 'react';
import { initializeApollo } from '../apollo/client';
import { GetServerSideProps } from 'next';
import {
  MarketSnapshotDocument,
  MarketSnapshotQuery,
  useMarketSnapshotQuery,
} from '@app/lib/graphql/hooks';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import format from 'date-fns/format';

const MarketPricesPage: React.FC = () => {
  const marketSnapshotQ = useMarketSnapshotQuery();
  return (
    <div>
      <h1>Idlescape Utils</h1>
      <Grid container spacing={2}>
        {marketSnapshotQ.data?.marketSnapshot?.map(it => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card elevation={3}>
              <CardHeader title={it?.name} />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText primary={it?.minPrice} secondary="Min Price" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={it?.maxPrice} secondary="Max Price" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={it?.medianPrice} secondary="Median Price" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={it?.averagePrice} secondary="Average Price" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={it?.relativeMinPrice} secondary="Relative Min Price" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={it?.volume} secondary="Volume" />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={format(new Date(it?.routineAt || 0), 'HH:mm:ss dd/MM/yyyy')}
                      secondary="Routine At"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query<MarketSnapshotQuery>({ query: MarketSnapshotDocument });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default MarketPricesPage;
