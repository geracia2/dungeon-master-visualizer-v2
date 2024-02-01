import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateStore } from './../store';
// ========= MUI stuff ▼
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const loggedItems = ['home', 'models', 'sounds', 'scene',];
const unloggedItems = ['home', 'login', 'register'];
// ========= MUI stuff ▲

export default function TopAppBar(props) {
  const navigate = useNavigate()
  const {
    user,
    setLoggedIn,
    setToken,
    clearUser,
    clearTitles,
    clearScene
  } = useStateStore((store) => ({
    user: store.user,
    setLoggedIn: store.setLoggedIn,
    setToken: store.setToken,
    clearUser: store.clearUser,
    clearTitles: store.clearTitles,
    clearScene: store.clearScene
  }))

  async function logout() {

    setToken(null);
    clearUser();
    clearTitles();
    clearScene();
    localStorage.removeItem('token')
    localStorage.removeItem('dmv')

    await setLoggedIn(false).then(() => { navigate('/login') });
  };
  // ========= MUI stuff ▼
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar alt="DMV logo" src="/art/DMVlogSm.svg" sx={{ m: 2, display: 'flex', alignSelf: "center" }} />
      </Box>
      <Divider />
      <List>
        {user.username ? (
          <>
            {/* if there is a user */}
            {loggedItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                  <Link to={`/${item}`}>
                    <Button key={item} sx={{ color: '#fff' }}>
                      {item}
                    </Button>
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ color: '#fff' }} onClick={logout}>
                  logout
                </Button>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            {/* no user */}
            {unloggedItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                  <Link to={`/${item}`}>
                    <Button key={item} sx={{ color: '#fff' }}>
                      {item}
                    </Button>
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}

      </List>
    </Box >
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  // MUI stuff ▲
  return (
    <>
      <Box sx={{ display: 'flex', marginBottom: '4.5rem', }}>
        <AppBar component="nav" enableColorOnDark >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} >
              <Avatar alt="DMV logo" src="/art/DMVlogSm.svg" />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {user.username ? (
                <>
                  {/* if there is a user */}
                  {loggedItems.map((item) => (
                    <Link to={`/${item}`} key={item}>
                      <Button sx={{ color: '#fff' }}>
                        {item}
                      </Button>
                    </Link>
                  ))}
                  <Button sx={{ color: '#fff' }} onClick={logout}>
                    logout
                  </Button>
                </>
              ) : (
                <>
                  {/* no user */}
                  {unloggedItems.map((item) => (
                    <Link to={`/${item}`} key={item}>
                      <Button key={item} sx={{ color: '#fff' }}>
                        {item}
                      </Button>
                    </Link>
                  ))}
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>

        {/* {props.children} */}
      </Box>
    </>
  )
}
