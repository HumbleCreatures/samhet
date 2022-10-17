import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';


import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

const PublicLayout = ({children}:{children: JSX.Element | JSX.Element[];}) => {
  return (<Sheet>
  <h1>samhet</h1>
  <div>public route</div>
  <Button>Knapp</Button>
  {children}
  <div>footer</div>
  </Sheet>)
};

const ProtectedLayout = ({children}:{children: JSX.Element | JSX.Element[];}) => {
  return (<Sheet>
  <h1>samhet</h1>
  <div>protected route</div>
  {children}
  <div>footer</div>
  </Sheet>)
};

export function App() {
  return (
    <CssVarsProvider>


    <BrowserRouter>
      <Routes>
        <Route  path='/'>

          <Route index element={<PublicLayout><div>Start page</div></PublicLayout>} />
          <Route path="login" element={<PublicLayout><div>login</div></PublicLayout>} />

        </Route>

        <Route  path='/app'>
          <Route index element={<ProtectedLayout><div>My page</div></ProtectedLayout>} />
          <Route path="profile" element={<ProtectedLayout><div>profile</div></ProtectedLayout>} />
        </Route>

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
    <div>Footer</div>

    </CssVarsProvider>
  );
}

export default App;
