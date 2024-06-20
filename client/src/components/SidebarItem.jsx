import { useTheme } from "@emotion/react"
import { ListItemButton, ListItemIcon } from "@mui/material"
import { useSelector } from "react-redux"
import { Link,useLocation} from "react-router-dom"
import {useState,useEffect} from "react"
import Details from "scenes/Details"


const SidebarItem = ({ item }) => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const [active, setActive] = useState("");
  const lcText = item.sidebarProps.displayText.toLowerCase();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return item.sidebarProps && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        backgroundColor:
          active === lcText
            ? theme.palette.secondary[300]
            : "transparent",
          color:
          active === lcText
            ? theme.palette.primary[600]
            : theme.palette.secondary[100],
      }}
    >
      <ListItemIcon
        sx={{
          ml: "2rem",
          color:
            active === lcText
              ? theme.palette.primary[600]
              : theme.palette.secondary[200],
        }}
      >
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      {item.sidebarProps.displayText}
    </ListItemButton>
  ):null
}

export default SidebarItem
