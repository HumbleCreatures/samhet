import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { ListOfLogins } from './components/ListOfLogins';
import { PublicLayout } from './components/PublicLayout';
import { ProtectedLayout } from './components/ProtectedLayout';
import { useAppDispatch, useAppSelector } from "./state/store";
import { MyProfileView } from "./profile/MyProfileView";
import { EditProfileView } from "./profile/EditProfileView";
import { useEffect } from "react";
import { fetchProfiles } from "./profile/profileSlice";
import { ProfileList } from "./profile/ProfileList";
import { ProfileView } from "./profile/ProfileView";
import { MyPods } from "./pod/myPods";
import { PodView } from "./pod/podView";

export const MainRouter = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const selectedProfile = useAppSelector((state) => state.profile.selectedProfile);
  const profilesLoaded = useAppSelector((state) => state.profile.profilesLoaded);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchProfiles());
    }
  }, [user, dispatch]);

  if(user && !profilesLoaded) {
    return <div>Loading...</div>
  }
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={user ? <Navigate to="/app" /> : <Navigate to="/login" />} />
    <Route path="/login" element={<PublicLayout><ListOfLogins></ListOfLogins></PublicLayout>} />

    {user && selectedProfile &&
      <Route  path='/app'>
        <Route index element={<ProtectedLayout><MyProfileView /></ProtectedLayout>} />
        <Route path="profile" element={<ProtectedLayout><div>profile</div></ProtectedLayout>} />
        <Route path="profiles" element={<ProtectedLayout><ProfileList /></ProtectedLayout>} />
        <Route path="pods" element={<ProtectedLayout><MyPods /></ProtectedLayout>} />
        <Route path="pod/:podIdParam" element={<ProtectedLayout><PodView /></ProtectedLayout>} />
        <Route path="profile/:displayNameParam" element={<ProtectedLayout><ProfileView /></ProtectedLayout>} />
        <Route path="profile/edit" element={<ProtectedLayout><EditProfileView/></ProtectedLayout>} />
      </Route>
    }

  {user && !selectedProfile &&
      <Route  path='/app'>
        <Route index element={<ProtectedLayout><MyProfileView /></ProtectedLayout>} />
        <Route path="profile" element={<ProtectedLayout><div>profile</div></ProtectedLayout>} />
        <Route path="profile/edit" element={<ProtectedLayout><EditProfileView/></ProtectedLayout>} />
      </Route>
    }

    <Route path="*" element={<p>There's nothing here: 404!</p>} />
  </Routes>
</BrowserRouter>
}
