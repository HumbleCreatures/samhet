import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { ListOfLogins } from './components/ListOfLogins';
import { PublicLayout } from './components/PublicLayout';
import { ProtectedLayout } from './components/ProtectedLayout';
import { useAppSelector } from "./state/store";

export const MainRouter = () => {

  const user = useAppSelector((state) => state.user.currentUser);

  return <BrowserRouter>
  <Routes>
    <Route path="/" element={user ? <Navigate to="/app" /> : <Navigate to="/login" />} />
    <Route path="/login" element={<PublicLayout><ListOfLogins></ListOfLogins></PublicLayout>} />

    {user &&
      <Route  path='/app'>
        <Route index element={<ProtectedLayout><div>My page</div></ProtectedLayout>} />
        <Route path="profile" element={<ProtectedLayout><div>profile</div></ProtectedLayout>} />
      </Route>
    }

    <Route path="*" element={<p>There's nothing here: 404!</p>} />
  </Routes>
</BrowserRouter>
}
