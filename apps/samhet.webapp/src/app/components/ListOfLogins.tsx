import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/joy/Button';

export const ListOfLogins = () => { 
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

                <Typography
                    level="body2"
                    startDecorator={<PersonIcon color="primary" />}
                    sx={{ alignItems: 'flex-start' }}
                >
                    Anders Andersson
                </Typography>
              <Typography level="body2">1111</Typography>
              <Typography level="body2">
                <Button size="sm">Login</Button>
              </Typography>

              <Typography
                    level="body2"
                    startDecorator={<PersonIcon color="primary" />}
                    sx={{ alignItems: 'flex-start' }}
                >
                    Berit Beritsson
                </Typography>
              <Typography level="body2">2222</Typography>
              <Typography level="body2">
                <Button size="sm">Login</Button>
              </Typography>



                </Sheet>
                </Box>
}