import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import filesTheme from './components/Theme';

import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import { ListOfLogins } from './components/ListOfLogins';
import { GlobalStyles } from '@mui/styled-engine';
import type { Theme } from '@mui/joy/styles';
import { Provider } from 'react-redux'
import { store } from './state/store';
import { PublicLayout } from './components/PublicLayout';
import { ProtectedLayout } from './components/ProtectedLayout';




export function App() {


  return (
    <Provider store={store}>
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <GlobalStyles<Theme>
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />


    <BrowserRouter>
      <Routes>
        <Route  path='/'>

          <Route index element={<PublicLayout><div>Start page</div></PublicLayout>} />
          <Route path="login" element={<PublicLayout><ListOfLogins></ListOfLogins></PublicLayout>} />

        </Route>

        <Route  path='/app'>
          <Route index element={<ProtectedLayout><div>My page</div></ProtectedLayout>} />
          <Route path="profile" element={<ProtectedLayout><div>profile</div></ProtectedLayout>} />
        </Route>

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>

    </CssVarsProvider>
    </Provider>
  );
}

export default App;
