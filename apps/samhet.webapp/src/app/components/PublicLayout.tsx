import Typography from "@mui/joy/Typography";
import Layout from "./Layout";
import { ColorSchemeToggle } from "./TopBar";

export const PublicLayout = ({children}:{children: JSX.Element | JSX.Element[];}) => {
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
