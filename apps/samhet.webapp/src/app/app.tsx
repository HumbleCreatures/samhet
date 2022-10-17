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
import { ColorSchemeToggle } from './components/TopBar';
import { GlobalStyles } from '@mui/styled-engine';
import type { Theme } from '@mui/joy/styles';
import Layout from './components/Layout';
import Typography from '@mui/joy/Typography';

const PublicLayout = ({children}:{children: JSX.Element | JSX.Element[];}) => {
  return (<Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
        }}
      >
        <Layout.Header>
         <Typography>samhet</Typography>
          <div><ColorSchemeToggle /></div>
        </Layout.Header>
        <div></div>
        <Layout.Main>
        {children}
        </Layout.Main>


      </Layout.Root>
  )
};

const ProtectedLayout = ({children}:{children: JSX.Element | JSX.Element[];}) => {
  return (<Sheet>
    <div>
    <h1>samhet</h1>
    <div><ColorSchemeToggle /></div>
    </div>
 
  <div>protected route</div>
  {children}
  <div>footer</div>
  </Sheet>)
};

export function App() {
  return (
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
  );
}

export default App;
