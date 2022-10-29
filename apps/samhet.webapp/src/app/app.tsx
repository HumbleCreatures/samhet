import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssVarsProvider } from '@mui/joy/styles';
import filesTheme from './components/Theme';
import { GlobalStyles } from '@mui/styled-engine';
import type { Theme } from '@mui/joy/styles';
import { Provider } from 'react-redux'
import { store } from './state/store';
import { useEffect } from 'react';
import { hydrateCurrentUser } from './state/userSlice';
import { MainRouter } from './router';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphClient';



export function App() {
  useEffect(() => {
    store.dispatch(hydrateCurrentUser());
  }, []);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
          <GlobalStyles<Theme>
            styles={(theme) => ({
              body: {
                margin: 0,
                fontFamily: theme.vars.fontFamily.body,
              },
            })}
          />
          <MainRouter />
        </CssVarsProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
