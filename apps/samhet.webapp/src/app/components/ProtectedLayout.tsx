import { Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { ProfileBadge } from "../profile/ProfileBadge";
import { useAppDispatch } from "../state/store";
import { removeCurrentUser } from "../state/userSlice";
import Layout from "./Layout";
import { ColorSchemeToggle } from "./TopBar";

export const ProtectedLayout = ({children}:{children: JSX.Element | JSX.Element[];}) => {

  const dipatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dipatch(removeCurrentUser());
    navigate('/login');
  };
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
          <div>
            <ProfileBadge />
            <Button onClick={logout}>Log out</Button>
            <ColorSchemeToggle />
          </div>
        </Layout.Header>
        <div></div>
        <Layout.Main>
        {children}
        </Layout.Main>
      </Layout.Root>
  )
  };
