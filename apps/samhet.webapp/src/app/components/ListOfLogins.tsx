import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/joy/Button';
import { useAppDispatch } from '../state/store';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser, User } from '../state/userSlice';


const users = [
  { name: 'John Doe', id: '111111' },
  { name: 'Jane Doe', id: '222222' },
 ];

export const ListOfLogins = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (user: User) => {
    dispatch(setCurrentUser(user));
    navigate('/app');
  }

  const listOfUsers = users.map((user) => {
    const onClick = () => handleLogin(user);
    return  <>
            <Typography
              level="body2"
              startDecorator={<PersonIcon color="primary" />}
              sx={{ alignItems: 'flex-start' }}
          >
              {user.name}
          </Typography>
          <Typography level="body2">{user.id}</Typography>
          <Typography level="body2">
          <Button size="sm" onClick={onClick}>Login</Button>
          </Typography></>
  });

    return <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 2,
                }}
            >
                <Sheet
                variant="outlined"
                sx={{
                    borderRadius: 'sm',
                    gridColumn: '1/-1',
                    bgcolor: 'background.componentBg',
                    display: { xs: 'none', sm: 'grid' },
                    gridTemplateColumns: '1fr 1fr 1fr',
                    '& > *': {
                    p: 2,
                    '&:nth-child(n):not(:nth-last-child(-n+3))': {
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    },
                    },
                }}
                >
                <Typography level="body3" fontWeight="md" noWrap>
                    Username
                </Typography>
                <Typography level="body3" fontWeight="md" noWrap>
                    Id
                </Typography>
                <Typography level="body3" fontWeight="md" noWrap>
                    Actions
                </Typography>

               {listOfUsers}
                </Sheet>
                </Box>
}
