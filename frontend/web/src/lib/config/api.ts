import { ConfigInterface } from 'swr';

export const endpointConfig: ConfigInterface<any, any, any> = {
  fetcher: (url: string) =>
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`).then(res => res.json()),
};
