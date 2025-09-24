// 'use client';
// import React from 'react';
// import { ReactNode } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { logout } from '@/redux/slices/authSlice';
// import { useRouter } from 'next/navigation';

// import {
//   AppBar,
//   Box,
//   CssBaseline,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Toolbar,
//   Typography,
//   Button,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// const drawerWidth = 240;

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function Layout({ children }: LayoutProps) {
//   const { role } = useSelector((state: RootState) => state.auth);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push('/login');
//   };

//   const adminLinks = [
//     { text: 'Dashboard', path: '/admin/dashboard' },
//   ];

//   const partnerLinks = [
//     { text: 'Dashboard', path: '/partner/dashboard' },
//     { text: 'My Orders', path: '/partner/dashboard#orders' },
//     { text: 'Availability', path: '/partner/dashboard#availability' },
//   ];

//   const navItems = role === 'admin' ? adminLinks : partnerLinks;

//   const drawer = (
//     <div>
//       <Toolbar>
//         <Typography variant="h6">Rentkar</Typography>
//       </Toolbar>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton onClick={() => router.push(item.path)}>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//         <Divider />
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleLogout}>
//             <ListItemText primary="Logout" />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </div>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             {role === 'admin' ? 'Admin Dashboard' : 'Partner Dashboard'}
//           </Typography>
//           <Box sx={{ flexGrow: 1 }} />
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar Drawer */}
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       >
//         {/* Mobile */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         {/* Desktop */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           mt: 8,
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// }


'use client';
import React, { ReactNode } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
