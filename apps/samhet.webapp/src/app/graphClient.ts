import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { store } from './state/store';

const httpLink = createHttpLink({
  uri: 'http://localhost:3333/graphql',
});

const authLink = setContext((_, { headers }) => {
  const userId = store.getState().user.currentUser?.id;
  const profileId = store.getState().profile.selectedProfile?.id;
  return {
    headers: {
      ...headers,
      'x-user-id': userId,
      'x-profile-id': profileId,
      //authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
