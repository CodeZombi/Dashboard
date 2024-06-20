import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material"
import appRoutes from "../routes/appRoutes"
import SidebarItem from "./SidebarItem"
import SidebarItemCollapse from "./SidebarItemCollapse"
import FlexBetween from "./FlexBetween";
import {
  ChevronLeft
} from "@mui/icons-material"
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Divider
} from "@mui/material";
import picture from '../public/assets/Screenshot 2023-11-18 190126.png';



const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const theme = useTheme();

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Optimum Steels
                  </Typography>
                </Box>
                
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
          </Box>
          

    
      <List disablePadding>
      <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack sx={{ width: "100%" }} direction="row" justifyContent="center">
            <Avatar src={picture} />
          </Stack>
          <Box textAlign="left" m = '1.5rem'>
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.fullName}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.email}
                </Typography>
              </Box>
        </Toolbar>
        
        {appRoutes.map((route, index) =>
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) :null
        )}
      </List>
      
    </Drawer>
    )}
    </Box>
  
  )
}

export default Sidebar


